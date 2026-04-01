import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  PLAY_STORE_URL,
  SEO_KEYWORDS,
} from "@/lib/seo";
import {
  getCityStats,
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

export const metadata: Metadata = {
  title: "Macedonian Radio Stations Directory",
  description:
    "Browse all Macedonian radio stations on MK Live Radio. Discover FM and online stations by city and open each station page instantly.",
  keywords: [
    ...SEO_KEYWORDS,
    "Macedonian radio stations list",
    "Macedonian FM stations",
    "Balkan online radio directory",
    "Skopje radio stations",
    "Bitola radio stations",
  ],
  alternates: {
    canonical: "/stations",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/stations"),
    title: "MK Live Radio Station Directory",
    description:
      "Explore 75+ Macedonian and Balkan radio streams with direct station pages and one-click web playback.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "MK Live Radio station directory" }],
  },
};

function cityAnchor(city: string) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function StationsPage() {
  const groupedByCity = stations.reduce<Record<string, typeof stations>>((acc, station) => {
    const city = getStationDisplayCity(station, "en") ?? "Other";
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(station);
    return acc;
  }, {});

  for (const city in groupedByCity) {
    groupedByCity[city].sort((a, b) =>
      getStationDisplayName(a, "en").localeCompare(getStationDisplayName(b, "en")),
    );
  }

  const sortedCities = Object.keys(groupedByCity).sort((a, b) => a.localeCompare(b));
  const cityStats = getCityStats("en");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I listen to Macedonian radio stations online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. MK Live Radio provides free access to publicly available Macedonian radio streams through web, iOS, and Android.",
        },
      },
      {
        "@type": "Question",
        name: "Does MK Live Radio include Balkan music and genre stations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The station list includes Macedonian and Balkan-focused stations, including pop, folk, talk, jazz, and genre channels.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a mobile radio app for MK Live Radio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. MK Live Radio is available as a mobile app for iOS and Android and also works in a browser web player.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-bold sm:text-5xl">Macedonian Radio Stations Directory</h1>
        <p className="mt-4 max-w-4xl text-base text-gray-300 sm:text-lg">
          Browse live Macedonian radio stations and Balkan radio channels in one place. This
          directory helps listeners discover stations by city, music style, and station name, then
          continue in the MK Live Radio web player or mobile app.
        </p>
        <p className="mt-3 max-w-4xl text-sm text-gray-400 sm:text-base">
          Keywords covered: Macedonian radios, Balkan radios, online radio Macedonia, MK Live Radio
          app, free radio streaming, and local FM stations from cities across North Macedonia.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/webplayer"
            className="rounded-full border border-white/25 px-4 py-2 font-semibold transition hover:border-white hover:bg-white hover:text-black"
          >
            Open Web Player
          </Link>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-gray-200 transition hover:border-white"
          >
            iOS App
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-gray-200 transition hover:border-white"
          >
            Android App
          </a>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Stations by City</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
            {cityStats.map(({ city, count }) => (
              <a
                key={city}
                href={`#city-${cityAnchor(city)}`}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-gray-200 transition hover:border-white/30 hover:bg-white/10"
              >
                {city} ({count})
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-10">
          {sortedCities.map((city) => (
            <div key={city} id={`city-${cityAnchor(city)}`}>
              <h2 className="text-2xl font-bold">{city}</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {groupedByCity[city].map((station) => {
                  const stationName = getStationDisplayName(station, "en");
                  const stationPath = getStationPath(station);

                  return (
                    <li key={station.id}>
                      <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`/logos/${pickStationLogoName(station)}.webp`}
                            alt={`${stationName} logo`}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-md bg-white/5 object-contain p-1"
                            loading="lazy"
                          />
                          <div>
                            <h3 className="text-base font-semibold">{stationName}</h3>
                            <p className="text-sm text-gray-400">{city}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-300">
                          {stationName} live stream page with links to web playback and mobile app
                          deep links.
                        </p>
                        <div className="mt-4 flex gap-3 text-sm">
                          <Link
                            href={stationPath}
                            className="font-semibold text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
                          >
                            Station page
                          </Link>
                          <Link
                            href={`/webplayer?id=${station.id}`}
                            className="text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                          >
                            Listen now
                          </Link>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
