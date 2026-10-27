import { readFileSync } from "node:fs";

const stationsData = JSON.parse(readFileSync(new URL("./data/stations.json", import.meta.url), "utf8"));

// Station pages used to live at /stations/{name}-{id} (e.g. /stations/antenna-5-0).
// Same normalisation as the old getStationSlug, so every old link 301s to the current page.
function legacyStationSlug(station) {
  const base =
    (station.name_en ?? station.name)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-") || "station";
  return `${base}-${station.id}`;
}

const legacyStationRedirects = stationsData
  .filter((station) => station.isVisible !== false && station.slug)
  .map((station) => ({
    source: `/stations/${legacyStationSlug(station)}`,
    destination: `/stations/${station.slug}`,
    permanent: true,
  }));

// English used to be served with ?lang=en; it now lives under /en
const englishQuery = [{ type: "query", key: "lang", value: "en" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  async redirects() {
    return [
      ...legacyStationRedirects,
      { source: "/", has: englishQuery, destination: "/en", permanent: true },
      { source: "/stations", has: englishQuery, destination: "/en/stations", permanent: true },
      { source: "/stations/:slug", has: englishQuery, destination: "/en/stations/:slug", permanent: true },
      { source: "/webplayer", has: englishQuery, destination: "/en/webplayer", permanent: true },
      { source: "/privacy", has: englishQuery, destination: "/en/privacy", permanent: true },
      { source: "/about", has: englishQuery, destination: "/en/about", permanent: true },
      // Duplicate of the English station directory
      { source: "/en/macedonian-radios", destination: "/en/stations", permanent: true },
    ];
  },
};

export default nextConfig;
