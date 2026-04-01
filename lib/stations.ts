import stationsData from "@/data/stations.json";

export type Station = {
  id: number;
  name: string;
  name_en?: string;
  logoDefault: string;
  url: string;
  shouldParseUrl?: boolean;
  website?: string;
  city?: string;
  city_en?: string;
};

export const stations = stationsData as Station[];

function normalizeSlugPart(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return normalized || "station";
}

export function getStationDisplayName(station: Station, locale: "mk" | "en" = "mk") {
  return locale === "en" ? station.name_en ?? station.name : station.name;
}

export function getStationDisplayCity(station: Station, locale: "mk" | "en" = "mk") {
  return locale === "en" ? station.city_en ?? station.city : station.city;
}

export function getStationSlug(station: Station) {
  const base = normalizeSlugPart(station.name_en ?? station.name);
  return `${base}-${station.id}`;
}

export function getStationPath(station: Station) {
  return `/stations/${getStationSlug(station)}`;
}

export function pickStationLogoName(station: Station) {
  return station.logoDefault || "radio1logo";
}

export function findStationById(id: number) {
  return stations.find((station) => station.id === id);
}

export function findStationBySlug(slug: string) {
  const idMatch = slug.match(/-(\d+)$/);
  if (!idMatch) {
    return null;
  }

  const id = Number(idMatch[1]);
  if (Number.isNaN(id)) {
    return null;
  }

  return findStationById(id) ?? null;
}

export function getCityStats(locale: "mk" | "en" = "en") {
  const cityCounts = new Map<string, number>();

  for (const station of stations) {
    const city = getStationDisplayCity(station, locale);
    if (!city) {
      continue;
    }
    cityCounts.set(city, (cityCounts.get(city) ?? 0) + 1);
  }

  return Array.from(cityCounts.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => a.city.localeCompare(b.city, locale));
}
