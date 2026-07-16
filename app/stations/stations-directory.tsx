import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";
import { absoluteUrl, DEFAULT_OG_IMAGE, SEO_KEYWORDS } from "@/lib/seo";
import type { StationArticleLanguage } from "@/lib/station-articles";
import {
  getCityStats,
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

export function createStationsMetadata(language: StationArticleLanguage): Metadata {
  const isEn = language === "en";

  return {
    title: isEn ? "Macedonian Radio Stations Directory" : "Македонски радио станици",
    description: isEn
      ? "Browse Macedonian FM and online radio stations by city, then start listening live on MK Live Radio."
      : "Прегледај македонски FM и онлајн радио станици по град и пушти ги во живо преку MK Live Radio.",
    keywords: [...SEO_KEYWORDS, "Macedonian radio stations list", "Macedonian FM stations", "Skopje radio stations", "Bitola radio stations"],
    alternates: {
      canonical: isEn ? "/en/stations" : "/stations",
      languages: { mk: "/stations", en: "/en/stations", "x-default": "/stations" },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "mk_MK",
      alternateLocale: isEn ? ["mk_MK"] : ["en_US"],
      url: absoluteUrl(isEn ? "/en/stations" : "/stations"),
      title: isEn ? "MK Live Radio Station Directory" : "Македонски радио станици",
      description: isEn
        ? "Macedonian radio streams grouped by city, with quick playback in the web player."
        : "Македонски радио стримови групирани по град, со брзо пуштање преку web player.",
      images: [{ url: DEFAULT_OG_IMAGE, alt: "MK Live Radio station directory" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "MK Live Radio Station Directory" : "Македонски радио станици",
      description: isEn
        ? "Browse Macedonian radio stations by city and open each live station page."
        : "Прегледај македонски радио станици по град и отвори ја страницата на секоја станица.",
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    other: { "content-language": language },
  };
}

function localizedPath(path: string, language: StationArticleLanguage) {
  return language === "en" ? `/en${path}` : path;
}

function cityAnchor(city: string) {
  return (
    city.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "") || "city"
  );
}

const pageCopy = {
  mk: {
    title: "Македонија, станица по станица.",
    seoTitle: "Македонски радио станици",
    intro: "Откриј ги македонските FM и онлајн станици по град. За најбрзо и најудобно слушање, симни ја MK Live Radio апликацијата.",
    byCity: "Скокни до град",
    stationPage: "Дознај повеќе",
    listenNow: "Web player",
    cardDescription: (stationName: string, city: string) => `${stationName} од ${city}. Информации, официјални линкови и пристап до live стрим.`,
    faqTitle: "За директориумот",
    faq: [
      { question: "Како се организирани македонските радио станици?", answer: "Станиците се групирани по град според податоците во тековната листа на MK Live Radio." },
      { question: "Може ли да отворам посебна страница за секоја станица?", answer: "Да. Секоја видлива станица има сопствена страница со стабилен URL, факти од постојните податоци и линк до web player." },
      { question: "Дали English верзијата е посебна страница?", answer: "Да. English верзијата се отвора на посебна /en адреса и има сопствен canonical и hreflang сигнал." },
    ],
  },
  en: {
    title: "Macedonia, station by station.",
    seoTitle: "Macedonian Radio Stations Directory",
    intro: "Discover Macedonian FM and online stations by city. For the fastest, most comfortable listening experience, download the MK Live Radio app.",
    byCity: "Jump to a city",
    stationPage: "Learn more",
    listenNow: "Web player",
    cardDescription: (stationName: string, city: string) => `${stationName} from ${city}. Station information, official links and access to the live stream.`,
    faqTitle: "About the directory",
    faq: [
      { question: "How are Macedonian radio stations organized?", answer: "Stations are grouped by city using the current MK Live Radio station data." },
      { question: "Can I open a dedicated page for each station?", answer: "Yes. Every visible station has its own stable URL, station facts from the existing data and a web player link." },
      { question: "Is the English version an independent page?", answer: "Yes. The English version uses its own /en address with dedicated canonical and hreflang signals." },
    ],
  },
} as const;

export default function StationsDirectoryPage({ language }: { language: StationArticleLanguage }) {
  const copy = pageCopy[language];
  const groupedByCity = stations.reduce<Record<string, typeof stations>>((acc, station) => {
    const city = getStationDisplayCity(station, language) ?? (language === "mk" ? "Друго" : "Other");
    (acc[city] ??= []).push(station);
    return acc;
  }, {});

  for (const city in groupedByCity) {
    groupedByCity[city].sort((a, b) => getStationDisplayName(a, language).localeCompare(getStationDisplayName(b, language)));
  }

  const sortedCities = Object.keys(groupedByCity).sort(
    (a, b) => groupedByCity[b].length - groupedByCity[a].length || a.localeCompare(b, language),
  );
  const cityStats = getCityStats(language);
  const pagePath = language === "en" ? "/en/stations" : "/stations";
  const homePath = language === "en" ? "/en" : "/";

  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(pagePath)}#faq`,
    mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
  const stationListSchema = {
    "@context": "https://schema.org", "@type": "ItemList", "@id": `${absoluteUrl(pagePath)}#station-list`,
    name: copy.seoTitle, numberOfItems: stations.length,
    itemListElement: stations.map((station, index) => ({ "@type": "ListItem", position: index + 1, name: getStationDisplayName(station, language), url: absoluteUrl(localizedPath(getStationPath(station), language)) })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MK Live Radio", item: absoluteUrl(homePath) },
      { "@type": "ListItem", position: 2, name: copy.seoTitle, item: absoluteUrl(pagePath) },
    ],
  };

  return (
    <main lang={language} className="site-page">
      {[faqSchema, stationListSchema, breadcrumbSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <SiteHeader language={language} active="stations" />

      <div className="site-shell">
        <section className="page-hero">
          <span className="eyebrow">{copy.seoTitle}</span>
          <h1>{copy.title}</h1>
          <p className="page-hero__intro">{copy.intro}</p>
          <StoreButtons compact />
        </section>
      </div>

      <div className="directory-jump">
        <div className="site-shell">
          <div className="city-cloud" aria-label={copy.byCity}>
            {cityStats.map(({ city, count }) => (
              <a key={city} href={`#city-${cityAnchor(city)}`} className="city-chip">
                {city} <span>{count}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="site-shell">
        {sortedCities.map((city) => (
          <section className="city-section" key={city} id={`city-${cityAnchor(city)}`}>
            <div className="city-section__heading">
              <h2>{city}</h2><span>{String(groupedByCity[city].length).padStart(2, "0")} STATIONS</span>
            </div>
            <ul className="station-directory-grid">
              {groupedByCity[city].map((station) => {
                const stationName = getStationDisplayName(station, language);
                const stationCity = getStationDisplayCity(station, language) ?? city;
                const stationPath = localizedPath(getStationPath(station), language);
                return (
                  <li className="directory-card" key={station.id}>
                    <div className="directory-card__head">
                      <Image src={`/logos/${pickStationLogoName(station)}.webp`} alt={`${stationName} logo`} width={54} height={54} loading="lazy" />
                      <div><h3>{stationName}</h3><p>{city}</p></div>
                    </div>
                    <p>{copy.cardDescription(stationName, stationCity)}</p>
                    <div className="directory-card__actions">
                      <Link href={stationPath}>{copy.stationPage} →</Link>
                      <Link href={`${language === "en" ? "/en" : ""}/webplayer?id=${station.id}`}>{copy.listenNow}</Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="section-block" id="faq">
          <div className="section-heading"><div><span className="eyebrow">FAQ</span><h2>{copy.faqTitle}</h2></div></div>
          <dl className="faq-grid">
            {copy.faq.map((item) => <div className="faq-item" key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}
          </dl>
        </section>
      </div>
      <SiteFooter language={language} />
    </main>
  );
}
