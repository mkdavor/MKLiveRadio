import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const projectRoot = process.cwd();
const sandbox = mkdtempSync(path.join(tmpdir(), "mkliveradio-lastmod-"));
const baselineManifest = readFileSync("data/sitemap-lastmod.json", "utf8");

function readManifest() {
  return JSON.parse(readFileSync(path.join(sandbox, "data/sitemap-lastmod.json"), "utf8"));
}

function restore(relativePath) {
  cpSync(path.join(projectRoot, relativePath), path.join(sandbox, relativePath));
}

function runGenerator(expectFailure = false) {
  try {
    execFileSync(process.execPath, ["scripts/generate-sitemap-lastmod.mjs"], {
      cwd: sandbox,
      encoding: "utf8",
      stdio: "pipe",
      env: { ...process.env, SOURCE_DATE_EPOCH: "" },
    });
    assert.equal(expectFailure, false, "Generator unexpectedly succeeded without a deterministic timestamp source");
  } catch (error) {
    if (!expectFailure) throw error;
    assert.match(`${error.stderr ?? error.message}`, /refusing to publish fake freshness/i);
  }
}

function resetFixture() {
  restore("app/about/page.tsx");
  restore("lib/station-articles.ts");
  restore("data/stations.json");
  writeFileSync(path.join(sandbox, "data/sitemap-lastmod.json"), baselineManifest, "utf8");
}

function changedPaths(before, after) {
  const paths = new Set([...Object.keys(before.entries), ...Object.keys(after.entries)]);
  return [...paths].filter((urlPath) => JSON.stringify(before.entries[urlPath]) !== JSON.stringify(after.entries[urlPath])).sort();
}

try {
  for (const directory of ["app", "data", "lib"]) cpSync(directory, path.join(sandbox, directory), { recursive: true });
  mkdirSync(path.join(sandbox, "scripts"));
  cpSync("scripts/generate-sitemap-lastmod.mjs", path.join(sandbox, "scripts/generate-sitemap-lastmod.mjs"));
  symlinkSync(path.join(projectRoot, "node_modules"), path.join(sandbox, "node_modules"), "dir");

  // A clean deployment without Git metadata must preserve the committed manifest byte-for-byte.
  runGenerator();
  assert.equal(readFileSync(path.join(sandbox, "data/sitemap-lastmod.json"), "utf8"), baselineManifest);

  // If content changed and neither Git nor SOURCE_DATE_EPOCH is available, fail instead of inventing freshness.
  const aboutPath = path.join(sandbox, "app/about/page.tsx");
  const originalAbout = readFileSync(aboutPath, "utf8");
  writeFileSync(aboutPath, originalAbout.replace('title: "За нас"', 'title: "За нас тест"'), "utf8");
  runGenerator(true);
  resetFixture();

  execFileSync("git", ["init", "-q"], { cwd: sandbox });
  execFileSync("git", ["config", "user.email", "seo-test@example.invalid"], { cwd: sandbox });
  execFileSync("git", ["config", "user.name", "SEO Test"], { cwd: sandbox });
  execFileSync("git", ["add", "app", "data", "lib", "scripts"], { cwd: sandbox });
  execFileSync("git", ["commit", "-qm", "baseline"], { cwd: sandbox });

  // Comments and formatting are not meaningful page content and must not change lastmod.
  writeFileSync(aboutPath, `${originalAbout}\n// Lastmod stress-test comment.\n`, "utf8");
  const beforeComment = readManifest();
  runGenerator();
  assert.deepEqual(changedPaths(beforeComment, readManifest()), []);
  resetFixture();

  // A localized page-content edit updates only that page, and its timestamp moves forward.
  writeFileSync(aboutPath, originalAbout.replace('title: "За нас"', 'title: "За нас тест"'), "utf8");
  const beforeAbout = readManifest();
  runGenerator();
  const afterAbout = readManifest();
  assert.deepEqual(changedPaths(beforeAbout, afterAbout), ["/about"]);
  assert.ok(Date.parse(afterAbout.entries["/about"].lastmod) > Date.parse(beforeAbout.entries["/about"].lastmod));
  resetFixture();

  // Stream-only changes must not create SEO freshness anywhere.
  const stationsPath = path.join(sandbox, "data/stations.json");
  const stationData = JSON.parse(readFileSync(stationsPath, "utf8"));
  stationData[0].url = `${stationData[0].url}?stress-test=1`;
  writeFileSync(stationsPath, `${JSON.stringify(stationData, null, 2)}\n`, "utf8");
  const beforeStream = readManifest();
  runGenerator();
  assert.deepEqual(changedPaths(beforeStream, readManifest()), []);
  resetFixture();

  // An English-only station article edit updates only that station's English URL.
  const articlesPath = path.join(sandbox, "lib/station-articles.ts");
  const articles = readFileSync(articlesPath, "utf8");
  writeFileSync(articlesPath, articles.replace('titleEn: "Antenna 5 live"', 'titleEn: "Antenna 5 live test"'), "utf8");
  const beforeArticle = readManifest();
  runGenerator();
  assert.deepEqual(changedPaths(beforeArticle, readManifest()), ["/en/stations/antenna-5"]);
  resetFixture();

  // Hiding a station removes exactly its two language URLs.
  const hiddenData = JSON.parse(readFileSync(stationsPath, "utf8"));
  const hiddenStation = hiddenData.find((station) => station.isVisible !== false);
  hiddenStation.isVisible = false;
  writeFileSync(stationsPath, `${JSON.stringify(hiddenData, null, 2)}\n`, "utf8");
  runGenerator();
  const hiddenManifest = readManifest();
  assert.equal(hiddenManifest.entries[`/stations/${hiddenStation.slug}`], undefined);
  assert.equal(hiddenManifest.entries[`/en/stations/${hiddenStation.slug}`], undefined);
  resetFixture();

  // Five hundred additional stations remain far below Google's per-sitemap URL limit.
  const expandedData = JSON.parse(readFileSync(stationsPath, "utf8"));
  for (let index = 0; index < 500; index += 1) {
    expandedData.push({
      id: 100_000 + index,
      name: `Stress Station ${index}`,
      name_en: `Stress Station ${index}`,
      slug: `stress-station-${index}`,
      logoDefault: "radio1logo",
      url: "https://example.invalid/stream",
      city: "Скопје",
      city_en: "Skopje",
    });
  }
  writeFileSync(stationsPath, `${JSON.stringify(expandedData, null, 2)}\n`, "utf8");
  runGenerator();
  const expandedManifest = readManifest();
  assert.equal(Object.keys(expandedManifest.entries).length, 1_111);
  assert.ok(expandedData.filter((station) => station.isVisible !== false).length < 50_000);

  console.log("Sitemap lastmod stress tests passed: stable deploy, no-Git safety, semantic edits, stream-only edits, station removal, and +500 stations.");
} finally {
  rmSync(sandbox, { recursive: true, force: true });
}
