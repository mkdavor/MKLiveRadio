import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  PLAY_STORE_URL,
  SITE_NAME,
} from "@/lib/seo";
import {
  findStationBySlug,
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
  getStationSlug,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

type StationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return stations.map((station) => ({ slug: getStationSlug(station) }));
}

export async function generateMetadata({ params }: StationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const station = findStationBySlug(slug);

  if (!station) {
    return {
      title: "Station Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const stationName = getStationDisplayName(station, "en");
  const stationCity = getStationDisplayCity(station, "en");
  const pagePath = getStationPath(station);

  return {
    title: `${stationName} Live Radio`,
    description: `Listen to ${stationName}${stationCity ? ` from ${stationCity}` : ""} live on MK Live Radio. Open in web player, iOS app, or Android app.`,
    keywords: [
      `${stationName} live`,
      `${stationName} online`,
      `${stationName} radio stream`,
      "Macedonian radio station",
      "Balkan radio stream",
    ],
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      type: "music.radio_station",
      url: absoluteUrl(pagePath),
      title: `${stationName} Live Stream | ${SITE_NAME}`,
      description: `Stream ${stationName} on MK Live Radio and open the station in web or mobile apps.`,
      images: [{ url: DEFAULT_OG_IMAGE, alt: `${stationName} live on MK Live Radio` }],
    },
  };
}

export default async function StationSeoPage({ params }: StationPageProps) {
  const { slug } = await params;
  const station = findStationBySlug(slug);

  if (!station) {
    notFound();
  }

  const stationName = getStationDisplayName(station, "en");
  const stationNameMk = getStationDisplayName(station, "mk");
  const stationCity = getStationDisplayCity(station, "en");
  const pagePath = getStationPath(station);
  const listenUrl = `/webplayer?id=${station.id}`;

  const radioStationSchema = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    name: stationName,
    alternateName: stationNameMk,
    url: absoluteUrl(pagePath),
    areaServed: "North Macedonia",
    inLanguage: ["mk", "en"],
    sameAs: station.website ? [station.website] : undefined,
    image: absoluteUrl(`/logos/${pickStationLogoName(station)}.webp`),
    potentialAction: {
      "@type": "ListenAction",
      target: absoluteUrl(listenUrl),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Stations",
        item: absoluteUrl("/stations"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: stationName,
        item: absoluteUrl(pagePath),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(radioStationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav className="text-sm text-gray-400">
          <Link
            href="/stations"
            className="underline decoration-white/20 underline-offset-4 transition hover:decoration-white/70"
          >
            Macedonian Radio Directory
          </Link>
        </nav>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image
              src={`/logos/${pickStationLogoName(station)}.webp`}
              alt={`${stationName} logo`}
              width={96}
              height={96}
              className="h-24 w-24 rounded-xl bg-white/5 object-contain p-2"
              priority
            />
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">{stationName} Live Radio</h1>
              <p className="mt-2 text-sm text-gray-300">
                {stationCity ? `City: ${stationCity}` : "Macedonian radio station"} · Online live
                stream
              </p>
            </div>
          </div>

          <p className="mt-6 text-base text-gray-200">
            Listen to {stationNameMk} ({stationName}) online with MK Live Radio. Open the station
            in the browser web player, or continue in the MK Live Radio mobile app for iPhone and
            Android.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={listenUrl}
              className="rounded-full border border-white/30 px-5 py-2 font-semibold transition hover:border-white hover:bg-white hover:text-black"
            >
              Listen Live
            </Link>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-5 py-2 text-gray-200 transition hover:border-white"
            >
              iOS App
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-5 py-2 text-gray-200 transition hover:border-white"
            >
              Android App
            </a>
            {station.website && (
              <a
                href={station.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-5 py-2 text-gray-300 transition hover:border-white/50 hover:text-white"
              >
                Official Station Site
              </a>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
