import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";

const manifestPath = "data/sitemap-lastmod.json";
const pageConfig = JSON.parse(readFileSync("data/sitemap-pages.json", "utf8"));
const allStations = JSON.parse(readFileSync("data/stations.json", "utf8"));
const stations = allStations.filter((station) => station.isVisible !== false);
const previous = JSON.parse(readFileSync(manifestPath, "utf8"));
const manifestVersion = 3;
const isFingerprintMigration = previous.version !== manifestVersion;
const sharedPageSources = ["app/layout.tsx", "app/components/site-chrome.tsx", "lib/seo.ts"];
const sharedStationSources = [
  ...sharedPageSources,
  "app/stations/station-detail.tsx",
  "lib/station-articles.ts",
  "lib/stations.ts",
];
const stationArticleSource = readFileSync("lib/station-articles.ts", "utf8");
const stationArticleAst = ts.createSourceFile(
  "lib/station-articles.ts",
  stationArticleSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const sourceContentCache = new Map();
const dirtyCache = new Map();
const lastModifiedCache = new Map();

function hash(values) {
  const digest = createHash("sha256");
  for (const value of values) digest.update(value).update("\0");
  return digest.digest("hex");
}

function propertyName(node) {
  if (!node) return "";
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return node.getText();
}

function meaningfulTokens(root, language, excludedNode) {
  const tokens = [];

  function visit(node) {
    if (node === excludedNode || ts.isImportDeclaration(node) || ts.isImportEqualsDeclaration(node) ||
        ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      return;
    }

    if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isMethodDeclaration(node)) {
      const name = propertyName(node.name);
      if (language === "mk" && name.endsWith("En")) return;
      if (language === "en" && name.endsWith("Mk")) return;
      tokens.push(`property:${name}`);
    } else if (ts.isStringLiteralLike(node)) {
      tokens.push(`string:${node.text}`);
    } else if (ts.isNumericLiteral(node)) {
      tokens.push(`number:${node.text}`);
    } else if (node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword ||
               node.kind === ts.SyntaxKind.NullKeyword) {
      tokens.push(`keyword:${node.kind}`);
    } else if (ts.isJsxText(node)) {
      const text = node.text.replace(/\s+/g, " ").trim();
      if (text) tokens.push(`jsx:${text}`);
    } else if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxClosingElement(node)) {
      tokens.push(`element:${node.tagName.getText()}`);
    }

    ts.forEachChild(node, visit);
  }

  visit(root);
  return tokens;
}

let researchSeedsDeclaration;
const stationArticleSeeds = new Map();
stationArticleAst.forEachChild((node) => {
  if (!ts.isVariableStatement(node)) return;
  for (const declaration of node.declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "RESEARCH_SEEDS" ||
        !declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
    researchSeedsDeclaration = node;
    for (const property of declaration.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const id = Number(propertyName(property.name));
      if (Number.isInteger(id)) stationArticleSeeds.set(id, property.initializer);
    }
  }
});

if (!researchSeedsDeclaration) {
  throw new Error("Could not locate RESEARCH_SEEDS in lib/station-articles.ts.");
}

const sharedStationArticleFingerprint = hash(meaningfulTokens(stationArticleAst, undefined, researchSeedsDeclaration));

function sourceContent(file) {
  if (sourceContentCache.has(file)) return sourceContentCache.get(file);
  let content;
  if (file === "data/stations.json") {
    const seoStations = allStations.map((station) => ({
      id: station.id,
      name: station.name,
      name_en: station.name_en,
      slug: station.slug,
      logoDefault: station.logoDefault,
      website: station.website,
      city: station.city,
      city_en: station.city_en,
      isVisible: station.isVisible,
    }));
    content = JSON.stringify(seoStations);
  } else if (file === "lib/station-articles.ts") {
    content = sharedStationArticleFingerprint;
  } else {
    const source = readFileSync(file, "utf8");
    if (!/\.[cm]?[jt]sx?$/.test(file)) {
      content = source;
    } else {
      const kind = file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
      const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, kind);
      content = meaningfulTokens(ast).join("\0");
    }
  }
  sourceContentCache.set(file, content);
  return content;
}

function sourceFingerprint(files) {
  return hash(files.map((file) => `${file}\0${sourceContent(file)}`));
}

function cacheKey(files) {
  return [...new Set(files)].sort().join("\0");
}

function hasUncommittedChanges(files) {
  const key = cacheKey(files);
  if (dirtyCache.has(key)) return dirtyCache.get(key);
  try {
    const dirty = execFileSync("git", ["status", "--porcelain", "--", ...files], { encoding: "utf8" }).trim() !== "";
    dirtyCache.set(key, dirty);
    return dirty;
  } catch {
    dirtyCache.set(key, false);
    return false;
  }
}

function gitLastModified(files) {
  const key = cacheKey(files);
  if (lastModifiedCache.has(key)) return lastModifiedCache.get(key);
  try {
    if (hasUncommittedChanges(files)) {
      const timestamp = new Date().toISOString();
      lastModifiedCache.set(key, timestamp);
      return timestamp;
    }

    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8" }).trim();
    if (date && !Number.isNaN(Date.parse(date))) {
      const timestamp = new Date(date).toISOString();
      lastModifiedCache.set(key, timestamp);
      return timestamp;
    }
  } catch {
    // A source checkout without Git metadata falls through to the reproducible build timestamp below.
  }

  const sourceDateEpoch = Number(process.env.SOURCE_DATE_EPOCH);
  if (Number.isFinite(sourceDateEpoch) && sourceDateEpoch > 0) {
    const timestamp = new Date(sourceDateEpoch * 1000).toISOString();
    lastModifiedCache.set(key, timestamp);
    return timestamp;
  }
  throw new Error(
    `Content changed in ${files.join(", ")}, but no deterministic modification time is available. ` +
    "Run the generator in a Git checkout or set SOURCE_DATE_EPOCH; refusing to publish fake freshness.",
  );
}

function keepOrUpdate(path, fingerprint, sources) {
  const oldEntry = previous.entries?.[path];
  if (oldEntry?.fingerprint === fingerprint && !Number.isNaN(Date.parse(oldEntry.lastmod))) {
    return oldEntry;
  }
  if (isFingerprintMigration && oldEntry && !Number.isNaN(Date.parse(oldEntry.lastmod)) &&
      !hasUncommittedChanges(sources)) {
    return { fingerprint, lastmod: new Date(oldEntry.lastmod).toISOString() };
  }
  let nextTimestamp = new Date(gitLastModified(sources)).getTime();
  const previousTimestamp = oldEntry ? Date.parse(oldEntry.lastmod) : Number.NaN;
  if (Number.isFinite(previousTimestamp) && nextTimestamp <= previousTimestamp) {
    nextTimestamp = previousTimestamp + 1;
  }
  return { fingerprint, lastmod: new Date(nextTimestamp).toISOString() };
}

const entries = {};

for (const page of pageConfig) {
  const sources = [...new Set([...sharedPageSources, ...page.sources])];
  entries[page.path] = keepOrUpdate(page.path, sourceFingerprint(sources), sources);
}

const stationSourceFingerprint = sourceFingerprint(sharedStationSources);
for (const station of stations) {
  const seoStation = {
    id: station.id,
    name: station.name,
    name_en: station.name_en,
    slug: station.slug,
    logoDefault: station.logoDefault,
    website: station.website,
    city: station.city,
    city_en: station.city_en,
    isVisible: station.isVisible,
  };

  for (const language of ["mk", "en"]) {
    const prefix = language === "en" ? "/en" : "";
    const path = `${prefix}/stations/${station.slug}`;
    const seed = stationArticleSeeds.get(station.id);
    const seedFingerprint = seed ? hash(meaningfulTokens(seed, language)) : "no-research-seed";
    const fingerprint = hash([stationSourceFingerprint, seedFingerprint, language, JSON.stringify(seoStation)]);
    entries[path] = keepOrUpdate(path, fingerprint, [...sharedStationSources, "data/stations.json"]);
  }
}

const orderedEntries = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)));
const serialized = `${JSON.stringify({ version: manifestVersion, entries: orderedEntries }, null, 2)}\n`;
const current = readFileSync(manifestPath, "utf8");
if (serialized !== current) writeFileSync(manifestPath, serialized, "utf8");
console.log(`${serialized === current ? "Verified" : "Updated"} sitemap lastmod data for ${Object.keys(orderedEntries).length} canonical URLs.`);
