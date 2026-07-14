import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  INSTAGRAM_URL,
  PLAY_STORE_URL,
  SEO_KEYWORDS,
  SITE_URL,
} from "@/lib/seo";
import {
  getCityStats,
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

type HomeLanguage = "mk" | "en";

const featuredStationIds = [0, 5, 50, 100, 140, 260];

const copy = {
  mk: {
    title: "Македонски радио станици во живо",
    description:
      "Слушај македонски радио станици во живо и бесплатно преку web, iPhone и Android. Најди радија од Скопје, Битола, Охрид и цела Македонија.",
    intro:
      "MK Live Radio ги собира македонските радио станици во едноставен web player и мобилни апликации за iPhone и Android.",
    stationsLink: "Сите радио станици",
    webPlayer: "Слушај без апликација",
    stationSection: "Избрани станици",
    citySection: "Преглед по град",
    platforms: "Достапно на",
    benefits: "Што добиваш",
    faq: "Често поставувани прашања",
    languageLabel: "English",
    platformItems: ["Web player", "iPhone", "Android"],
    benefitItems: [
      "Брз пристап до македонски FM и онлајн радио станици.",
      "Станиците се организирани по град за полесно пребарување.",
      "Истото слушање е достапно во browser и преку мобилните апликации.",
    ],
    faqItems: [
      {
        question: "Дали MK Live Radio е бесплатен?",
        answer:
          "Да. Можеш бесплатно да слушаш јавно достапни македонски радио стримови преку web player, iPhone и Android.",
      },
      {
        question: "Каде можам да најдам радио станици по град?",
        answer:
          "Отвори ја страницата со радио станици и избери град како Скопје, Битола, Охрид, Прилеп или друг град од тековната листа.",
      },
      {
        question: "Дали MK Live Radio ги поседува радио станиците?",
        answer:
          "Не. MK Live Radio е апликација и директориум за слушање јавно достапни стримови од трети радио станици.",
      },
    ],
  },
  en: {
    title: "Macedonian Radio Stations Live",
    description:
      "Listen to Macedonian radio stations live and free on the web, iPhone and Android. Browse stations from Skopje, Bitola, Ohrid and across Macedonia.",
    intro:
      "MK Live Radio brings Macedonian radio stations into a simple web player and mobile apps for iPhone and Android.",
    stationsLink: "All Radio Stations",
    webPlayer: "Open Web Player",
    stationSection: "Selected Stations",
    citySection: "Browse by City",
    platforms: "Available On",
    benefits: "Benefits",
    faq: "Frequently Asked Questions",
    languageLabel: "Македонски",
    platformItems: ["Web player", "iPhone", "Android"],
    benefitItems: [
      "Quick access to Macedonian FM and online radio stations.",
      "Stations are organized by city for easier browsing.",
      "The same listening experience is available in the browser and mobile apps.",
    ],
    faqItems: [
      {
        question: "Is MK Live Radio free?",
        answer:
          "Yes. You can listen to publicly available Macedonian radio streams for free through the web player, iPhone app, and Android app.",
      },
      {
        question: "Where can I find radio stations by city?",
        answer:
          "Open the radio stations page and choose a city such as Skopje, Bitola, Ohrid, Prilep, or another city from the current list.",
      },
      {
        question: "Does MK Live Radio own the radio stations?",
        answer:
          "No. MK Live Radio is an app and directory for listening to publicly available streams from third-party radio stations.",
      },
    ],
  },
} as const;

function localizedPath(path: string, language: "mk" | "en") {
  return language === "en" ? `${path}?lang=en` : path;
}

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

export function createHomeMetadata(language: HomeLanguage): Metadata {
  const isEn = language === "en";
  const pageCopy = copy[language];
  const canonicalPath = isEn ? "/en" : "/";

  return {
    title: isEn ? pageCopy.title : `${pageCopy.title} | MK Live Radio`,
    description: pageCopy.description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        mk: absoluteUrl("/"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/"),
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "mk_MK",
      alternateLocale: isEn ? ["mk_MK"] : ["en_US"],
      url: absoluteUrl(canonicalPath),
      title: pageCopy.title,
      description: pageCopy.description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: "MK Live Radio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageCopy.title,
      description: pageCopy.description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    other: {
      "content-language": language,
    },
  };
}

export function HomePageContent({ language }: { language: HomeLanguage }) {
  const pageCopy = copy[language];
  const featuredStations = featuredStationIds
    .map((id) => stations.find((station) => station.id === id))
    .filter(Boolean)
    .slice(0, 6) as typeof stations;
  const cityStats = getCityStats(language).slice(0, 8);
  const canonicalPath = language === "en" ? "/en" : "/";
  const alternatePath = language === "en" ? "/" : "/en";
  const stationsPath = localizedPath("/stations", language);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: "MK Live Radio",
    url: SITE_URL,
    inLanguage: ["mk", "en"],
  };

  const mobileAppSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        name: "MK Live Radio iOS",
        operatingSystem: "iOS",
        applicationCategory: "MusicApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: APP_STORE_URL,
      },
      {
        "@type": "MobileApplication",
        name: "MK Live Radio Android",
        operatingSystem: "Android",
        applicationCategory: "MusicApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: PLAY_STORE_URL,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(canonicalPath)}#faq`,
    mainEntity: pageCopy.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const stationListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageCopy.stationSection,
    numberOfItems: featuredStations.length,
    itemListElement: featuredStations.map((station, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getStationDisplayName(station, language),
      url: absoluteUrl(localizedPath(getStationPath(station), language)),
    })),
  };

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationListSchema) }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href={canonicalPath} className="flex items-center gap-3 transition hover:opacity-80">
            <Image
              src="/logo.png"
              alt="MK Live Radio"
              width={48}
              height={48}
              className="h-12 w-12 rounded-2xl shadow-lg"
              priority
            />
            <span className="text-lg font-semibold">MK Live Radio</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <Link href={stationsPath} className="transition hover:text-white">
              {pageCopy.stationsLink}
            </Link>
            <Link href="/webplayer" className="transition hover:text-white">
              Web Player
            </Link>
            <Link href={alternatePath} hrefLang={language === "en" ? "mk" : "en"} className="transition hover:text-white">
              {pageCopy.languageLabel}
            </Link>
          </nav>
        </header>

        <section className="grid items-center gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal sm:text-6xl">
              {pageCopy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
              {pageCopy.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={stationsPath}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-black transition hover:bg-gray-200"
              >
                {pageCopy.stationsLink}
              </Link>
              <Link
                href="/webplayer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c63a2e]/50 bg-[#c63a2e]/20 px-6 text-sm font-semibold text-white transition hover:border-[#ff8176]/80 hover:bg-[#c63a2e]/30"
              >
                {pageCopy.webPlayer}
              </Link>
            </div>
          </div>
          <Image
            src="/logo.png"
            alt="MK Live Radio Logo"
            width={280}
            height={280}
            className="mx-auto h-44 w-44 rounded-[2rem] shadow-[0_28px_90px_rgba(198,58,46,0.28)] sm:h-64 sm:w-64"
            priority
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold">{pageCopy.stationSection}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStations.map((station) => {
              const stationName = getStationDisplayName(station, language);
              const stationCity = getStationDisplayCity(station, language);

              return (
                <li key={station.id}>
                  <Link
                    href={localizedPath(getStationPath(station), language)}
                    className="flex h-full items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/30 hover:bg-white/[0.06]"
                  >
                    <Image
                      src={`/logos/${pickStationLogoName(station)}.webp`}
                      alt={`${stationName} logo`}
                      width={52}
                      height={52}
                      className="h-[52px] w-[52px] rounded-lg bg-white/10 object-contain p-1"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{stationName}</span>
                      {stationCity && (
                        <span className="mt-1 block text-sm text-gray-400">{stationCity}</span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{pageCopy.citySection}</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {cityStats.map(({ city, count }) => (
                <Link
                  key={city}
                  href={`${stationsPath}#city-${cityAnchor(city)}`}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-gray-200 transition hover:border-white/30 hover:bg-white/10"
                >
                  {city} ({count})
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{pageCopy.platforms}</h2>
            <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-sm text-gray-200">
              {pageCopy.platformItems.map((item) => (
                <li key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
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
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{pageCopy.benefits}</h2>
            <ul className="mt-4 space-y-3 text-gray-300">
              {pageCopy.benefitItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#e26156]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{pageCopy.faq}</h2>
            <dl className="mt-4 space-y-4">
              {pageCopy.faqItems.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-white">{item.question}</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-300">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          <Link href="/privacy" className="transition hover:text-white">
            {language === "mk" ? "Политика за приватност" : "Privacy Policy"}
          </Link>
          <span className="mx-2">·</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
            @mkliveradio
          </a>
          <span className="mx-2">·</span>
          © {new Date().getFullYear()} MK Live Radio
        </footer>
      </div>
    </main>
  );
}
