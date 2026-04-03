import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getStationPath, stations } from "@/lib/stations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/webplayer"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/stations"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/macedonian-radios"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const stationRoutes: MetadataRoute.Sitemap = stations.map((station) => ({
    url: absoluteUrl(getStationPath(station)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...stationRoutes];
}
