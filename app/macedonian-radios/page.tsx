import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, APP_STORE_URL, DEFAULT_OG_IMAGE, PLAY_STORE_URL } from "@/lib/seo";
import {
  getStationDisplayCity,
  getStationDisplayName,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

export const metadata: Metadata = {
  title: "Macedonian Radios Online",
  description:
    "Listen to Macedonian radios online with MK Live Radio. Stream local FM and online stations for free on web, iOS, and Android.",
  keywords: [
    "Macedonian radios",
    "Macedonian radio online",
    "Macedonian FM radio",
    "radio stations Macedonia",
    "MK Live Radio",
  ],
  alternates: {
    canonical: "/macedonian-radios",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/macedonian-radios"),
    title: "Macedonian Radios Online | MK Live Radio",
    description: "Free online streaming for Macedonian radio stations with web player and apps.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Macedonian radios online" }],
  },
};

export default function MacedonianRadiosPage() {
  const allStations = [...stations].sort((a, b) =>
    getStationDisplayName(a, "en").localeCompare(getStationDisplayName(b, "en")),
  );

  const stationListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Macedonian radios and stations",
    numberOfItems: allStations.length,
    itemListElement: allStations.map((station, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getStationDisplayName(station, "en"),
      url: absoluteUrl(`/webplayer?id=${station.id}`),
    })),
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationListSchema) }}
      />
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold sm:text-5xl">Macedonian Radios Online</h1>
        <p className="mt-4 max-w-3xl text-gray-300">
          MK Live Radio is a Macedonian radio directory and streaming platform. Listen to music,
          news, folk, pop, and talk radio from stations across North Macedonia.
        </p>
        <p className="mt-2 max-w-3xl text-gray-300">
          Available on web player and official mobile radio apps for iPhone and Android.
        </p>

        <div className="mt-6 flex flex-col items-start gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src="/appstore.svg"
                alt="Download on the App Store"
                width={168}
                height={56}
                className="h-14 w-auto transition hover:scale-105"
              />
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image
                src="/playstore.svg"
                alt="Get it on Google Play"
                width={189}
                height={56}
                className="h-14 w-auto transition hover:scale-105"
              />
            </a>
          </div>
          <Link
            href="/webplayer"
            className="group inline-flex items-center gap-2 rounded-full border border-[#c63a2e]/45 bg-gradient-to-r from-[#c63a2e]/26 via-[#d14a3f]/22 to-[#8f2018]/24 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(198,58,46,0.28)] transition duration-300 hover:scale-[1.03] hover:border-[#e26156]/75 hover:shadow-[0_0_38px_rgba(198,58,46,0.48)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#e26156] transition group-hover:bg-[#ff8478]" />
            Listen in Web Player
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">All Stations</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allStations.map((station) => (
              <li key={station.id}>
                <Link
                  href={`/webplayer?id=${station.id}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <Image
                    src={`/logos/${pickStationLogoName(station)}.webp`}
                    alt={`${getStationDisplayName(station, "en")} logo`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-lg bg-white/10 p-1 object-contain"
                    loading="lazy"
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">
                      {getStationDisplayName(station, "en")}
                    </span>
                    <span className="mt-1 block text-sm text-gray-400">
                      {getStationDisplayCity(station, "en") ?? "Live stream"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
