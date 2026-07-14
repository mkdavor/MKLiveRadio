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
import { resolveStationArticleLanguage } from "@/lib/station-articles";
import {
  getCityStats,
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

type StationsPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: StationsPageProps): Promise<Metadata> {
  const { lang } = (await searchParams) ?? {};
  const language = resolveStationArticleLanguage(lang);
  const isEn = language === "en";

  return {
    title: isEn ? "Macedonian Radio Stations Directory" : "Македонски радио станици",
    description: isEn
      ? "Browse Macedonian FM and online radio stations by city, then start listening live on MK Live Radio."
      : "Прегледај македонски FM и онлајн радио станици по град и пушти ги во живо преку MK Live Radio.",
    keywords: [
      ...SEO_KEYWORDS,
      "Macedonian radio stations list",
      "Macedonian FM stations",
      "Skopje radio stations",
      "Bitola radio stations",
    ],
    alternates: {
      canonical: isEn ? "/stations?lang=en" : "/stations",
      languages: {
        mk: "/stations",
        en: "/stations?lang=en",
        "x-default": "/stations",
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "mk_MK",
      alternateLocale: isEn ? ["mk_MK"] : ["en_US"],
      url: absoluteUrl(isEn ? "/stations?lang=en" : "/stations"),
      title: isEn ? "MK Live Radio Station Directory" : "Македонски радио станици",
      description: isEn
        ? "Macedonian radio streams grouped by city, with quick playback in the web player."
        : "Македонски радио стримови групирани по град, со брзо пуштање преку web player.",
      images: [{ url: DEFAULT_OG_IMAGE, alt: "MK Live Radio station directory" }],
    },
    other: {
      "content-language": language,
    },
  };
}

function localizedPath(path: string, language: "mk" | "en") {
  return language === "en" ? `${path}?lang=en` : path;
}

const pageCopy = {
  mk: {
    title: "Македонски радио станици",
    intro:
      "Македонските радио станици се собрани на едно место, групирани по град и достапни за слушање без дополнително пребарување.",
    webPlayer: "Слушај без апликација",
    byCity: "Станици по град",
    stationPage: "Страница",
    listenNow: "Слушај",
    cardDescription: (stationName: string, city: string) =>
      `${stationName} од ${city}. Отвори ја станицата или пушти ја веднаш во web player.`,
  },
  en: {
    title: "Macedonian Radio Stations Directory",
    intro:
      "Macedonian radio stations are collected in one place, grouped by city, and ready to play without searching through separate sources.",
    webPlayer: "Open Web Player",
    byCity: "Stations by City",
    stationPage: "Station page",
    listenNow: "Listen",
    cardDescription: (stationName: string, city: string) =>
      `${stationName} from ${city}. Open the station page or start listening in the web player.`,
  },
};

function cityAnchor(city: string) {
  return (
    city
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "") || "city"
  );
}

export default async function StationsPage({ searchParams }: StationsPageProps) {
  const { lang } = (await searchParams) ?? {};
  const language = resolveStationArticleLanguage(lang);
  const copy = pageCopy[language];
  const groupedByCity = stations.reduce<Record<string, typeof stations>>((acc, station) => {
    const city =
      getStationDisplayCity(station, language) ?? (language === "mk" ? "Друго" : "Other");
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(station);
    return acc;
  }, {});

  for (const city in groupedByCity) {
    groupedByCity[city].sort((a, b) =>
      getStationDisplayName(a, language).localeCompare(getStationDisplayName(b, language)),
    );
  }

  const sortedCities = Object.keys(groupedByCity).sort(
    (a, b) => groupedByCity[b].length - groupedByCity[a].length || a.localeCompare(b, language),
  );
  const cityStats = getCityStats(language);

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
        name: "Does MK Live Radio include music and genre stations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The station list includes Macedonian stations across pop, folk, talk, jazz, and genre channels.",
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

      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <header className="mb-10 flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-80">
            <Image
              src="/logo.png"
              alt="MK Live Radio"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl shadow"
            />
            <span className="hidden text-lg font-semibold sm:block">MK Live Radio</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/stations"
              hrefLang="mk"
              aria-label="Switch to Macedonian"
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
                language === "mk" ? "bg-white text-black" : "border-gray-600 text-white"
              }`}
            >
              <Image src="https://flagcdn.com/w40/mk.png" alt="MK" width={16} height={12} />
              MK
            </Link>
            <Link
              href="/stations?lang=en"
              hrefLang="en"
              aria-label="Switch to English"
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
                language === "en" ? "bg-white text-black" : "border-gray-600 text-white"
              }`}
            >
              <Image src="https://flagcdn.com/w40/gb.png" alt="EN" width={16} height={12} />
              EN
            </Link>
          </div>
        </header>

        <h1 className="text-3xl font-bold sm:text-5xl">{copy.title}</h1>
        <p className="mt-4 max-w-4xl text-base text-gray-300 sm:text-lg">
          {copy.intro}
        </p>

        <div className="mt-6 flex flex-col items-start gap-4">
          <Link
            href="/webplayer"
            className="group inline-flex items-center gap-2 rounded-full border border-[#c63a2e]/45 bg-gradient-to-r from-[#c63a2e]/26 via-[#d14a3f]/22 to-[#8f2018]/24 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(198,58,46,0.28)] transition duration-300 hover:scale-[1.03] hover:border-[#e26156]/75 hover:shadow-[0_0_38px_rgba(198,58,46,0.48)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#e26156] transition group-hover:bg-[#ff8478]" />
            {copy.webPlayer}
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
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">{copy.byCity}</h2>
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
                  const stationName = getStationDisplayName(station, language);
                  const stationCity = getStationDisplayCity(station, language) ?? city;
                  const stationPath = localizedPath(getStationPath(station), language);

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
                          {copy.cardDescription(stationName, stationCity)}
                        </p>
                        <div className="mt-4 flex gap-3 text-sm">
                          <Link
                            href={stationPath}
                            className="font-semibold text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
                          >
                            {copy.stationPage}
                          </Link>
                          <Link
                            href={`/webplayer?id=${station.id}`}
                            className="text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                          >
                            {copy.listenNow}
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

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
        </footer>
      </div>
    </main>
  );
}
