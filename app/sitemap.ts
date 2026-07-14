import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getStationPath, stations } from "@/lib/stations";

const CONTENT_LAST_MODIFIED = new Date("2026-07-14");

function languageAlternates(mkPath: string, enPath: string) {
  return {
    languages: {
      mk: absoluteUrl(mkPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(mkPath),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1,
      alternates: languageAlternates("/", "/en"),
    },
    {
      url: absoluteUrl("/en"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.95,
      alternates: languageAlternates("/", "/en"),
    },
    {
      url: absoluteUrl("/webplayer"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/stations"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: languageAlternates("/stations", "/stations?lang=en"),
    },
    {
      url: absoluteUrl("/stations?lang=en"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.85,
      alternates: languageAlternates("/stations", "/stations?lang=en"),
    },
    {
      url: absoluteUrl("/macedonian-radios"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const stationRoutes: MetadataRoute.Sitemap = stations.flatMap((station) => {
    const stationPath = getStationPath(station);
    const englishPath = `${stationPath}?lang=en`;
    const alternates = languageAlternates(stationPath, englishPath);

    return [
      {
        url: absoluteUrl(stationPath),
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates,
      },
      {
        url: absoluteUrl(englishPath),
        lastModified: CONTENT_LAST_MODIFIED,
        changeFrequency: "weekly" as const,
        priority: 0.75,
        alternates,
      },
    ];
  });

  return [...staticRoutes, ...stationRoutes];
}
