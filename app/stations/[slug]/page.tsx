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
      "Macedonia radio stream",
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
  const pageUrl = absoluteUrl(pagePath);
  const listenAbsoluteUrl = absoluteUrl(listenUrl);
  const pageId = `${pageUrl}#webpage`;
  const stationId = `${pageUrl}#radiostation`;
  const streamId = `${pageUrl}#stream`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const stationLogoUrl = absoluteUrl(`/logos/${pickStationLogoName(station)}.webp`);

  const radioStationSchema = {
    "@type": "RadioStation",
    "@id": stationId,
    name: stationName,
    alternateName: stationNameMk,
    url: pageUrl,
    mainEntityOfPage: {
      "@id": pageId,
    },
    areaServed: "Macedonia",
    inLanguage: ["mk", "en"],
    sameAs: station.website ? [station.website] : undefined,
    image: stationLogoUrl,
    potentialAction: {
      "@type": "ListenAction",
      target: listenAbsoluteUrl,
    },
  };

  const streamSchema = {
    "@type": "AudioObject",
    "@id": streamId,
    name: `${stationName} live stream`,
    contentUrl: station.url,
    embedUrl: listenAbsoluteUrl,
    inLanguage: ["mk", "en"],
    regionAllowed: "Macedonia",
    isPartOf: {
      "@id": stationId,
    },
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": pageId,
    url: pageUrl,
    name: `${stationName} Live Radio`,
    isPartOf: {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: stationLogoUrl,
    },
    breadcrumb: {
      "@id": breadcrumbId,
    },
    mainEntity: {
      "@id": stationId,
    },
    about: {
      "@id": streamId,
    },
    inLanguage: ["mk", "en"],
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [webPageSchema, radioStationSchema, streamSchema, breadcrumbSchema],
          }),
        }}
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

          <div className="mt-6 flex flex-col items-start gap-4">
            <Link
              href={listenUrl}
              className="group inline-flex items-center gap-2 rounded-full border border-[#c63a2e]/45 bg-gradient-to-r from-[#c63a2e]/26 via-[#d14a3f]/22 to-[#8f2018]/24 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(198,58,46,0.28)] transition duration-300 hover:scale-[1.03] hover:border-[#e26156]/75 hover:shadow-[0_0_38px_rgba(198,58,46,0.48)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#e26156] transition group-hover:bg-[#ff8478]" />
              Open Web Player
            </Link>
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
