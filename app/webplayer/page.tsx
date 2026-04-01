import type { Metadata } from "next";
import WebPlayerClient from "./WebPlayerClient";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { getStationPath, stations } from "@/lib/stations";

export const metadata: Metadata = {
  title: "Web Player",
  description:
    "Listen to Macedonian and Balkan radio stations live in your browser. Search stations by city and share direct station links.",
  keywords: [
    ...SEO_KEYWORDS,
    "web radio player",
    "live radio stream",
    "listen Macedonian radio online",
  ],
  alternates: {
    canonical: "/webplayer",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/webplayer"),
    title: "MK Live Radio Web Player",
    description:
      "Play Macedonian radio online instantly. Browse 75+ live stations from Skopje, Bitola, Ohrid, Strumica, and more.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "MK Live Radio Web Player" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Live Radio Web Player",
    description: "Listen to Macedonian and Balkan stations live in one web player.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function WebPlayerPage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["mk", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/webplayer")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const stationListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Macedonian radio stations on MK Live Radio",
    numberOfItems: stations.length,
    itemListElement: stations.map((station, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: station.name_en ?? station.name,
      url: absoluteUrl(getStationPath(station)),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationListSchema) }}
      />
      <WebPlayerClient />
    </>
  );
}
