import { stations, type Station } from "@/lib/stations";

export type City = {
  slug: string;
  nameMk: string;
  nameEn: string;
  stations: Station[];
};

/** "Sveti Nikole" -> "sveti-nikole" (from the English city name, so URLs stay ASCII) */
export function getCitySlug(cityEn: string) {
  return cityEn
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Cities with at least one visible station, biggest first */
export function getCities(): City[] {
  const bySlug = new Map<string, City>();

  for (const station of stations) {
    if (!station.city || !station.city_en) {
      continue;
    }
    const slug = getCitySlug(station.city_en);
    const city = bySlug.get(slug) ?? { slug, nameMk: station.city, nameEn: station.city_en, stations: [] };
    city.stations.push(station);
    bySlug.set(slug, city);
  }

  return Array.from(bySlug.values()).sort(
    (a, b) => b.stations.length - a.stations.length || a.nameEn.localeCompare(b.nameEn),
  );
}

export function findCityBySlug(slug: string) {
  return getCities().find((city) => city.slug === slug);
}

export function getCityPath(slug: string, language: "mk" | "en") {
  return `${language === "en" ? "/en" : ""}/radio/${slug}`;
}
