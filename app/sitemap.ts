import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getStationPath, stations } from "@/lib/stations";

const CONTENT_LAST_MODIFIED = new Date("2026-07-16");

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
      alternates: languageAlternates("/webplayer", "/en/webplayer"),
    },
    {
      url: absoluteUrl("/en/webplayer"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: languageAlternates("/webplayer", "/en/webplayer"),
    },
    {
      url: absoluteUrl("/stations"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: languageAlternates("/stations", "/en/stations"),
    },
    {
      url: absoluteUrl("/en/stations"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.85,
      alternates: languageAlternates("/stations", "/en/stations"),
    },
    {
      url: absoluteUrl("/en/macedonian-radios"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: languageAlternates("/privacy", "/en/privacy"),
    },
    {
      url: absoluteUrl("/about"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: languageAlternates("/about", "/en/about"),
    },
    {
      url: absoluteUrl("/en/about"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.55,
      alternates: languageAlternates("/about", "/en/about"),
    },
    {
      url: absoluteUrl("/en/privacy"),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.35,
      alternates: languageAlternates("/privacy", "/en/privacy"),
    },
  ];

  const stationRoutes: MetadataRoute.Sitemap = stations.flatMap((station) => {
    const stationPath = getStationPath(station);
    const englishPath = `/en${stationPath}`;
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
