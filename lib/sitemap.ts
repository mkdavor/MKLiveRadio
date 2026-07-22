import lastmodData from "@/data/sitemap-lastmod.json";
import pageData from "@/data/sitemap-pages.json";
import { absoluteUrl } from "@/lib/seo";
import { getStationPath, stations } from "@/lib/stations";

type SitemapLastmodData = {
  version: number;
  entries: Record<string, { fingerprint: string; lastmod: string }>;
};

type SitemapPage = { path: string; sources: string[] };

const lastmodEntries = (lastmodData as SitemapLastmodData).entries;

export const sitemapPages = pageData as SitemapPage[];

export type SitemapUrl = {
  loc: string;
  lastmod: string;
};

export function getLastmod(path: string) {
  const lastmod = lastmodEntries[path]?.lastmod;
  if (!lastmod || Number.isNaN(Date.parse(lastmod))) {
    throw new Error(`Missing or invalid sitemap lastmod for ${path}. Run npm run sitemap:lastmod.`);
  }
  return new Date(lastmod).toISOString();
}

export function getPageSitemapUrls(): SitemapUrl[] {
  return sitemapPages.map(({ path }) => ({ loc: absoluteUrl(path), lastmod: getLastmod(path) }));
}

export function getStationSitemapUrls(language: "mk" | "en"): SitemapUrl[] {
  return stations.map((station) => {
    const stationPath = getStationPath(station);
    const path = language === "en" ? `/en${stationPath}` : stationPath;
    return { loc: absoluteUrl(path), lastmod: getLastmod(path) };
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderUrlSet(urls: SitemapUrl[]) {
  const entries = urls
    .map(({ loc, lastmod }) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function renderSitemapIndex(sitemaps: Array<{ loc: string }>) {
  const entries = sitemaps
    .map(({ loc }) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
