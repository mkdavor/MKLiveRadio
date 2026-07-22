import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const SITE_URL = "https://mkliveradio.app";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const stations = JSON.parse(readFileSync("data/stations.json", "utf8"));
const visibleStations = stations.filter((station) => station.isVisible !== false);
const sitemapPages = JSON.parse(readFileSync("data/sitemap-pages.json", "utf8"));
const sitemapLastmod = JSON.parse(readFileSync("data/sitemap-lastmod.json", "utf8"));
assert.equal(sitemapLastmod.version, 3, "Sitemap fingerprint manifest version is out of date");

function normalizeSlugPart(value) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-") || "station"
  );
}

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const absolute = path.join(dir, entry);
    const stat = statSync(absolute);

    if (stat.isDirectory()) {
      return walk(absolute);
    }

    return absolute;
  });
}

const slugs = new Map();
const visibleSlugs = new Set();

for (const station of stations) {
  assert.equal(typeof station.slug, "string", `Station ${station.id} is missing slug`);
  assert.match(station.slug, slugPattern, `Station ${station.id} has malformed slug`);

  const duplicate = slugs.get(station.slug);
  assert.equal(duplicate, undefined, `Duplicate slug "${station.slug}" on ${duplicate} and ${station.id}`);
  slugs.set(station.slug, station.id);

  const legacySlug = `${normalizeSlugPart(station.name_en ?? station.name)}-${station.id}`;
  assert.notEqual(station.slug, legacySlug, `Station ${station.id} still uses legacy slug ${legacySlug}`);

  if (station.isVisible !== false) {
    visibleSlugs.add(station.slug);
  }
}

assert.equal(visibleStations.length, visibleSlugs.size, "Visible station slug count mismatch");

const stationUrls = visibleStations.flatMap((station) => [
  `${SITE_URL}/stations/${station.slug}`,
  `${SITE_URL}/en/stations/${station.slug}`,
]);

const expectedSitemapPaths = [
  ...sitemapPages.map((page) => page.path),
  ...visibleStations.flatMap((station) => [
    `/stations/${station.slug}`,
    `/en/stations/${station.slug}`,
  ]),
];

assert.equal(new Set(expectedSitemapPaths).size, expectedSitemapPaths.length, "Every canonical path must appear exactly once across child sitemaps");
assert.deepEqual(
  Object.keys(sitemapLastmod.entries).sort(),
  [...expectedSitemapPaths].sort(),
  "Sitemap lastmod manifest must match the complete canonical URL set",
);

for (const [urlPath, entry] of Object.entries(sitemapLastmod.entries)) {
  assert.match(entry.fingerprint, /^[a-f0-9]{64}$/, `Invalid content fingerprint for ${urlPath}`);
  assert.match(entry.lastmod, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, `lastmod must be an ISO-8601 UTC timestamp for ${urlPath}`);
  assert.ok(!Number.isNaN(Date.parse(entry.lastmod)), `Invalid lastmod date for ${urlPath}`);
}

for (const url of stationUrls) {
  const parsed = new URL(url);
  const slug = parsed.pathname.replace(/^\/en/, "").replace("/stations/", "");
  assert.ok(visibleSlugs.has(slug), `Sitemap station URL does not map to a visible station: ${url}`);
}

const sourceFiles = ["app", "lib"].flatMap(walk).filter((file) => /\.(ts|tsx|css)$/.test(file));
const source = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");

assert.ok(!source.includes("?lang=en"), "English routes must use the /en path prefix");

assert.ok(
  !source.includes("slug.match(/-(\\d+)$/)") && !source.includes("slug.match(/-(\\d+)$/"),
  "Station slug lookup must not parse trailing numeric IDs",
);

for (const station of stations) {
  const legacySlug = `${normalizeSlugPart(station.name_en ?? station.name)}-${station.id}`;
  assert.ok(!source.includes(`/stations/${legacySlug}`), `Legacy station URL still appears: ${legacySlug}`);
}

assert.ok(source.includes("notFound()"), "Station page should call notFound() for invalid slugs");
assert.ok(source.includes("alternates") && source.includes("x-default"), "Metadata should include hreflang alternates");
assert.ok(source.includes("BreadcrumbList"), "Structured data should include BreadcrumbList");
assert.ok(source.includes("FAQPage"), "Structured data should include visible FAQ content");
assert.ok(source.includes('sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), "Root sitemap must be a sitemap index");
assert.ok(source.includes('urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), "Child sitemaps must use the standard sitemap namespace");
assert.ok(!source.includes("changeFrequency") && !source.includes("priority:"), "Sitemaps must not emit ignored priority or changefreq fields");

const deepLinkClient = readFileSync("app/station/StationDeepLinkClient.tsx", "utf8");
assert.ok(
  deepLinkClient.includes("/iPhone|iPad|iPod/i") &&
    deepLinkClient.includes("navigator.maxTouchPoints > 1") &&
    deepLinkClient.includes("/Macintosh|Mac OS X/i"),
  "Apple and iPadOS platform detection must remain present",
);
assert.ok(
  deepLinkClient.includes("/Android/i") &&
    deepLinkClient.includes("package=app.mkliveradio.android"),
  "Android intent detection and package targeting must remain present",
);
assert.ok(
  deepLinkClient.includes("mkliveradio://station?id=${id}") &&
    deepLinkClient.includes("intent://station?id=${id}#Intent;scheme=mkliveradio"),
  "Native station deep links must preserve the requested station id",
);
assert.ok(
  deepLinkClient.includes("/webplayer${stationId !== null ? `?id=${stationId}` : \"\"}"),
  "Web-player fallback must preserve the requested station id",
);

console.log(`SEO validation passed for ${stations.length} station records and ${visibleStations.length} visible station URLs.`);
