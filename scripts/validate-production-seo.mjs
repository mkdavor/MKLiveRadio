import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const baseUrl = process.env.SEO_BASE_URL ?? "http://127.0.0.1:3107";
const siteUrl = "https://mkliveradio.app";
const pages = JSON.parse(readFileSync("data/sitemap-pages.json", "utf8"));
const stations = JSON.parse(readFileSync("data/stations.json", "utf8")).filter((station) => station.isVisible !== false);
const staticPaths = pages.map((page) => page.path);
const mkStationPaths = stations.map((station) => `/stations/${station.slug}`);
const enStationPaths = stations.map((station) => `/en/stations/${station.slug}`);
const allPaths = [...staticPaths, ...mkStationPaths, ...enStationPaths];
const sitemapPaths = ["/sitemap-pages.xml", "/sitemap-stations-mk.xml", "/sitemap-stations-en.xml"];

function matches(text, expression) {
  return [...text.matchAll(expression)].map((match) => match[1]);
}

function decodeXml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&apos;", "'");
}

async function fetchText(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `${path} must return HTTP 200`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return { response, bytes, text };
}

function validateXml(path, bytes) {
  const validation = spawnSync("xmllint", ["--noout", "-"], { input: bytes });
  if (validation.error?.code !== "ENOENT") {
    assert.equal(validation.status, 0, `${path} must be well-formed XML: ${validation.stderr?.toString() ?? ""}`);
  }
}

const indexResult = await fetchText("/sitemap.xml");
assert.match(indexResult.response.headers.get("content-type") ?? "", /^application\/xml;\s*charset=utf-8$/i);
assert.match(indexResult.text, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert.match(indexResult.text, /<sitemapindex xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
assert.ok(indexResult.bytes.byteLength < 50 * 1024 * 1024, "Sitemap index must be smaller than 50 MB");
validateXml("/sitemap.xml", indexResult.bytes);

const indexEntries = matches(indexResult.text, /<sitemap>([\s\S]*?)<\/sitemap>/g);
assert.ok(indexEntries.length <= 50_000, "Sitemap index must reference at most 50,000 child sitemaps");
for (const entry of indexEntries) {
  assert.deepEqual(matches(entry, /<([a-z]+)>/g), ["loc"], "Sitemap index entries must contain only the required loc field");
}

const indexedSitemaps = matches(indexResult.text, /<loc>(.*?)<\/loc>/g).map(decodeXml);
assert.deepEqual(indexedSitemaps, sitemapPaths.map((path) => `${siteUrl}${path}`), "Sitemap index must reference exactly the three canonical child sitemaps");

const expectedBySitemap = new Map([
  ["/sitemap-pages.xml", staticPaths],
  ["/sitemap-stations-mk.xml", mkStationPaths],
  ["/sitemap-stations-en.xml", enStationPaths],
]);
const discoveredUrls = [];

for (const sitemapPath of sitemapPaths) {
  const result = await fetchText(sitemapPath);
  assert.match(result.response.headers.get("content-type") ?? "", /^application\/xml;\s*charset=utf-8$/i);
  assert.ok(result.bytes.byteLength < 50 * 1024 * 1024, `${sitemapPath} must be smaller than 50 MB`);
  assert.match(result.text, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(result.text, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  validateXml(sitemapPath, result.bytes);

  const entries = matches(result.text, /<url>([\s\S]*?)<\/url>/g);
  assert.ok(entries.length <= 50_000, `${sitemapPath} must contain at most 50,000 URLs`);
  const actualPaths = [];

  for (const entry of entries) {
    const childTags = matches(entry, /<([a-z]+)>/g);
    assert.deepEqual(childTags, ["loc", "lastmod"], "Every URL entry must contain only loc and lastmod");
    const loc = decodeXml(matches(entry, /<loc>(.*?)<\/loc>/g)[0] ?? "");
    const lastmod = matches(entry, /<lastmod>(.*?)<\/lastmod>/g)[0] ?? "";
    const parsed = new URL(loc);
    assert.equal(parsed.origin, siteUrl, `Sitemap URL must use the canonical origin: ${loc}`);
    assert.equal(parsed.search, "", `Sitemap URL must not contain a query: ${loc}`);
    assert.equal(parsed.hash, "", `Sitemap URL must not contain a fragment: ${loc}`);
    assert.match(lastmod, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, `Invalid ISO-8601 UTC lastmod for ${loc}`);
    assert.ok(!Number.isNaN(Date.parse(lastmod)), `Invalid lastmod for ${loc}`);
    assert.ok(Date.parse(lastmod) <= Date.now() + 5 * 60_000, `Future lastmod is not credible for ${loc}`);
    actualPaths.push(parsed.pathname);
    discoveredUrls.push(loc);
  }

  assert.deepEqual(actualPaths, expectedBySitemap.get(sitemapPath), `${sitemapPath} has missing, extra, or reordered URLs`);
}

assert.equal(new Set(discoveredUrls).size, discoveredUrls.length, "No URL may be duplicated across child sitemaps");
assert.equal(discoveredUrls.length, allPaths.length, "All canonical URLs must be discoverable through the sitemap index");

const translatedPairs = new Map([
  ["/", "/en"],
  ["/webplayer", "/en/webplayer"],
  ["/stations", "/en/stations"],
  ["/privacy", "/en/privacy"],
  ["/about", "/en/about"],
  ...stations.map((station) => [`/stations/${station.slug}`, `/en/stations/${station.slug}`]),
]);

for (const path of allPaths) {
  const { text } = await fetchText(path);
  const canonicals = matches(text, /<link rel="canonical" href="([^"]+)"\s*\/>/g);
  const normalizedCanonicals = canonicals.map((canonical) => new URL(canonical).href);
  assert.deepEqual(normalizedCanonicals, [new URL(path, siteUrl).href], `${path} must have exactly one self-referencing canonical`);
  assert.doesNotMatch(text, /<meta name="robots" content="[^"]*noindex/i, `${path} must remain indexable`);

  const mkPath = path.startsWith("/en") ? [...translatedPairs].find(([, en]) => en === path)?.[0] : path;
  const enPath = mkPath ? translatedPairs.get(mkPath) : undefined;
  if (mkPath && enPath) {
    // Next renders href first, so parse the complete tags to retain both values.
    const tags = matches(text, /(<link rel="alternate"[^>]+>)/g);
    const languages = Object.fromEntries(tags.map((tag) => {
      const href = /href="([^"]+)"/.exec(tag)?.[1];
      const language = /hrefLang="([^"]+)"/.exec(tag)?.[1];
      return [language, href];
    }));
    const normalizedLanguages = Object.fromEntries(Object.entries(languages).map(([language, href]) => [language, new URL(href).href]));
    assert.deepEqual(normalizedLanguages, {
      en: new URL(enPath, siteUrl).href,
      mk: new URL(mkPath, siteUrl).href,
      "x-default": new URL(mkPath, siteUrl).href,
    }, `${path} must have reciprocal, self-referencing language alternatives`);
  }

  const schemas = [];
  for (const json of matches(text, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let schema;
    assert.doesNotThrow(() => { schema = JSON.parse(json.replaceAll("&quot;", '"')); }, `${path} contains invalid JSON-LD`);
    schemas.push(...(schema?.["@graph"] ?? [schema]));
  }

  assert.equal(schemas.filter((schema) => schema?.["@type"] === "Organization").length, 1, `${path} must contain one Organization entity`);
  if (["/", "/en", "/webplayer", "/en/webplayer"].includes(path)) {
    assert.equal(schemas.filter((schema) => schema?.["@type"] === "WebSite").length, 1, `${path} must contain one WebSite entity`);
  }
  assert.equal(schemas.filter((schema) => schema?.["@type"] === "SearchAction").length, 0, `${path} must not advertise an unsupported site search action`);

  if (path.includes("/stations/")) {
    const webPages = schemas.filter((schema) => schema?.["@type"] === "WebPage");
    assert.equal(webPages.length, 1, `${path} must contain one WebPage entity`);
    assert.equal(new URL(webPages[0].url).href, new URL(path, siteUrl).href, `${path} WebPage URL must match its canonical`);
    assert.equal(webPages[0].inLanguage, path.startsWith("/en/") ? "en" : "mk", `${path} WebPage language is incorrect`);
  }

  if (path === "/stations" || path === "/en/stations" || path.includes("/stations/")) {
    const breadcrumbs = schemas.filter((schema) => schema?.["@type"] === "BreadcrumbList");
    assert.equal(breadcrumbs.length, 1, `${path} must contain one BreadcrumbList`);
    assert.ok(breadcrumbs[0].itemListElement.length >= 2, `${path} breadcrumb must contain at least two items`);
    breadcrumbs[0].itemListElement.forEach((item, index) => {
      assert.equal(item.position, index + 1, `${path} breadcrumb positions must be sequential`);
      assert.ok(item.name, `${path} breadcrumb items require names`);
      if (item.item) assert.equal(new URL(item.item).origin, siteUrl, `${path} breadcrumb items must use the canonical origin`);
    });
  }
}

const utilityPage = await fetchText("/station");
assert.match(utilityPage.text, /<meta name="robots" content="[^"]*noindex/i, "The app deep-link utility must remain noindex");
assert.ok(!discoveredUrls.includes(`${siteUrl}/station`), "The noindex app deep-link utility must not appear in a sitemap");

const directory = await fetchText("/stations");
const linkedMkStations = new Set(matches(directory.text, /href="(\/stations\/[^"]+)"/g));
assert.deepEqual([...linkedMkStations].sort(), [...mkStationPaths].sort(), "The MK directory must link to every MK station page");
const englishDirectory = await fetchText("/en/stations");
const linkedEnStations = new Set(matches(englishDirectory.text, /href="(\/en\/stations\/[^"]+)"/g));
assert.deepEqual([...linkedEnStations].sort(), [...enStationPaths].sort(), "The EN directory must link to every EN station page");

const robots = await fetchText("/robots.txt");
assert.match(robots.text, /User-Agent: \*/i);
assert.match(robots.text, /Allow: \//i);
assert.match(robots.text, /Disallow: \/api\//i);
assert.doesNotMatch(robots.text, /Disallow: \/(?:\r?\n|$)/i, "robots.txt must not block the whole site");
assert.match(robots.text, new RegExp(`Sitemap: ${siteUrl.replaceAll(".", "\\.")}\/sitemap\\.xml`));
assert.doesNotMatch(robots.text, /^Host:/im, "robots.txt should not emit the unsupported Host directive");

console.log(`Production SEO validation passed for ${allPaths.length} canonical pages and ${sitemapPaths.length} child sitemaps.`);
