import stationsData from "@/data/stations.json";

export type Station = {
  id: number;
  name: string;
  name_en?: string;
  slug: string;
  logoDefault: string;
  url: string;
  isVisible?: boolean;
  shouldParseUrl?: boolean;
  website?: string;
  city?: string;
  city_en?: string;
};

export const STATION_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const allStations = stationsData as Station[];

function normalizeSlugPart(value: string) {
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

function validateStationSlugs(stationList: Station[]) {
  const seen = new Map<string, number>();

  for (const station of stationList) {
    if (!station.slug) {
      throw new Error(`Station ${station.id} (${station.name}) is missing an explicit slug.`);
    }

    if (!STATION_SLUG_PATTERN.test(station.slug)) {
      throw new Error(`Station ${station.id} (${station.name}) has invalid slug "${station.slug}".`);
    }

    const duplicateId = seen.get(station.slug);
    if (duplicateId !== undefined) {
      throw new Error(
        `Duplicate station slug "${station.slug}" for station IDs ${duplicateId} and ${station.id}.`,
      );
    }

    seen.set(station.slug, station.id);

    const legacyGeneratedSlug = `${normalizeSlugPart(station.name_en ?? station.name)}-${station.id}`;
    if (station.slug === legacyGeneratedSlug) {
      throw new Error(
        `Station ${station.id} (${station.name}) still uses generated slug "${station.slug}".`,
      );
    }
  }
}

validateStationSlugs(allStations);

export const stations = allStations.filter((station) => station.isVisible !== false);

export function getStationDisplayName(station: Station, locale: "mk" | "en" = "mk") {
  return locale === "en" ? station.name_en ?? station.name : station.name;
}

export function getStationDisplayCity(station: Station, locale: "mk" | "en" = "mk") {
  return locale === "en" ? station.city_en ?? station.city : station.city;
}

export function getStationSlug(station: Station) {
  return station.slug;
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
  return stations.find((station) => station.slug === slug) ?? null;
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
    .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city, locale));
}
