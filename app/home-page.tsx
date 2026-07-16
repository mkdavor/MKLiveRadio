import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
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

const featuredStationIds = [0, 5, 50, 100, 20, 260];

const copy = {
  mk: {
    title: "Македонски радио станици во живо",
    heroLineOne: "Сите македонски радија.",
    heroLineTwo: "Една апликација.",
    description:
      "Слушај македонски радио станици во живо и бесплатно преку web, iPhone и Android. Најди радија од Скопје, Битола, Охрид и цела Македонија.",
    intro:
      "Симни ја MK Live Radio и носи ги омилените македонски станици со себе — на iPhone, iPad и Android.",
    stationsLink: "Истражи ги станиците",
    webPlayer: "Продолжи во web player",
    stationSection: "Гласови од цела Македонија",
    stationIntro:
      "Од локални фреквенции до национални фаворити — брзо најди го звукот што го бараш.",
    citySection: "Најди радио по град",
    appTitle: "Направена за секојдневно слушање.",
    appText:
      "Апликацијата е најдобриот начин да ја користиш MK Live Radio: брза, едноставна и секогаш подготвена кога ти треба познат звук.",
    benefits: [
      "Брз пристап до македонски FM и онлајн радио станици.",
      "Станиците се организирани по град за полесно пребарување.",
      "Еден допир до радиото што го сакаш, каде и да си.",
    ],
    faqTitle: "Добро е да знаеш",
    eyebrow: "Твојата Македонија. Секогаш во етер.",
    appEyebrow: "MK Live Radio за iOS и Android",
    metricStations: "активни станици",
    metricCities: "градови во директориумот",
    metricPlatforms: "мобилни платформи",
    faqItems: [
      {
        question: "Дали MK Live Radio е бесплатен?",
        answer:
          "Да. Можеш бесплатно да слушаш јавно достапни македонски радио стримови преку iPhone, Android и web player.",
      },
      {
        question: "Каде можам да најдам радио станици по град?",
        answer:
          "Отвори го директориумот и избери град како Скопје, Битола, Охрид, Прилеп или друг град од тековната листа.",
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
    heroLineOne: "Every Macedonian station.",
    heroLineTwo: "One app.",
    description:
      "Listen to Macedonian radio stations live and free on the web, iPhone and Android. Browse stations from Skopje, Bitola, Ohrid and across Macedonia.",
    intro:
      "Download MK Live Radio and take your favorite Macedonian stations everywhere — on iPhone, iPad and Android.",
    stationsLink: "Explore the stations",
    webPlayer: "Continue in the web player",
    stationSection: "Voices from across Macedonia",
    stationIntro:
      "From local frequencies to national favorites — quickly find the sound you are looking for.",
    citySection: "Find radio by city",
    appTitle: "Made for everyday listening.",
    appText:
      "The app is the best way to experience MK Live Radio: fast, focused and always ready when you need a familiar sound.",
    benefits: [
      "Quick access to Macedonian FM and online radio stations.",
      "Stations organized by city for effortless discovery.",
      "One tap to the radio you love, wherever you are.",
    ],
    faqTitle: "Good to know",
    eyebrow: "Your Macedonia. Always on.",
    appEyebrow: "MK Live Radio for iOS and Android",
    metricStations: "active stations",
    metricCities: "cities in the directory",
    metricPlatforms: "mobile platforms",
    faqItems: [
      {
        question: "Is MK Live Radio free?",
        answer:
          "Yes. You can listen to publicly available Macedonian radio streams for free through the iPhone app, Android app and web player.",
      },
      {
        question: "Where can I find radio stations by city?",
        answer:
          "Open the directory and choose Skopje, Bitola, Ohrid, Prilep, or another city from the current list.",
      },
      {
        question: "Does MK Live Radio own the radio stations?",
        answer:
          "No. MK Live Radio is an app and directory for listening to publicly available streams from third-party radio stations.",
      },
    ],
  },
} as const;

function localizedPath(path: string, language: HomeLanguage) {
  return language === "en" ? `/en${path}` : path;
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
      languages: { mk: absoluteUrl("/"), en: absoluteUrl("/en"), "x-default": absoluteUrl("/") },
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
    other: { "content-language": language },
  };
}

export function HomePageContent({ language }: { language: HomeLanguage }) {
  const pageCopy = copy[language];
  const featuredStations = featuredStationIds
    .map((id) => stations.find((station) => station.id === id))
    .filter(Boolean)
    .slice(0, 6) as typeof stations;
  const allCityStats = getCityStats(language);
  const cityStats = allCityStats.slice(0, 10);
  const canonicalPath = language === "en" ? "/en" : "/";
  const stationsPath = localizedPath("/stations", language);
  const playerPath = localizedPath("/webplayer", language);

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
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
    <main lang={language} className="site-page">
      {[websiteSchema, mobileAppSchema, faqSchema, stationListSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SiteHeader language={language} active="home" />

      <div className="site-shell">
        <section className="hero">
          <div>
            <span className="eyebrow">{pageCopy.eyebrow}</span>
            <h1>
              {pageCopy.heroLineOne}<br />
              <em>{pageCopy.heroLineTwo}</em>
            </h1>
            <p className="hero-copy">{pageCopy.intro}</p>
            <div className="hero-actions">
              <StoreButtons />
              <div className="secondary-links">
                <Link href={stationsPath} className="secondary-link">
                  {pageCopy.stationsLink} <span aria-hidden>→</span>
                </Link>
                <Link href={playerPath} className="secondary-link secondary-link--muted">
                  {pageCopy.webPlayer}
                </Link>
              </div>
            </div>
          </div>

          <div className="product-visual" aria-label="MK Live Radio mobile app preview">
            {featuredStations[1] ? (
              <div className="visual-chip visual-chip--one" aria-hidden>
                <Image
                  src={`/logos/${pickStationLogoName(featuredStations[1])}.webp`}
                  alt=""
                  width={38}
                  height={38}
                />
                {getStationDisplayName(featuredStations[1], language)}
              </div>
            ) : null}
            <div className="phone" aria-hidden>
              <div className="phone-screen">
                <div className="phone-topline"><span>MK LIVE</span><span>ON AIR</span></div>
                <div className="phone-logo">
                  <Image src="/logo.png" alt="" width={118} height={118} priority />
                </div>
                <div className="phone-now">
                  <small>{language === "en" ? "NOW PLAYING" : "СЕГА ВО ЕТЕР"}</small>
                  <strong>MK Live Radio</strong>
                </div>
                <div className="waveform">
                  {Array.from({ length: 18 }).map((_, index) => <span key={index} />)}
                </div>
                <div className="phone-play">▶</div>
              </div>
            </div>
            {featuredStations[4] ? (
              <div className="visual-chip visual-chip--two" aria-hidden>
                <Image
                  src={`/logos/${pickStationLogoName(featuredStations[4])}.webp`}
                  alt=""
                  width={38}
                  height={38}
                />
                {getStationDisplayName(featuredStations[4], language)}
              </div>
            ) : null}
          </div>
        </section>

        <section className="metrics-strip" aria-label="Platform overview">
          <div className="metric"><strong>{stations.length}</strong><span>{pageCopy.metricStations}</span></div>
          <div className="metric"><strong>{allCityStats.length}</strong><span>{pageCopy.metricCities}</span></div>
          <div className="metric"><strong>iOS + Android</strong><span>{pageCopy.metricPlatforms}</span></div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{language === "en" ? "Discover" : "Откриј"}</span>
              <h2>{pageCopy.stationSection}</h2>
            </div>
            <p>{pageCopy.stationIntro}</p>
          </div>
          <div className="station-showcase">
            {featuredStations.map((station, index) => {
              const stationName = getStationDisplayName(station, language);
              return (
                <Link
                  href={localizedPath(getStationPath(station), language)}
                  className="station-tile"
                  key={station.id}
                >
                  <span className="station-tile__top">
                    <Image
                      src={`/logos/${pickStationLogoName(station)}.webp`}
                      alt={`${stationName} logo`}
                      width={72}
                      height={72}
                    />
                    <span className="station-tile__index">0{index + 1}</span>
                  </span>
                  <span>
                    <strong>{stationName}</strong>
                    <small>{getStationDisplayCity(station, language) ?? "Macedonia"}</small>
                  </span>
                  <span className="station-tile__arrow" aria-hidden>↗</span>
                </Link>
              );
            })}
          </div>
          <div className="secondary-links">
            <Link href={stationsPath} className="secondary-link">{pageCopy.stationsLink} →</Link>
          </div>
        </section>

        <section className="app-pitch" id="download-app">
          <div>
            <span className="eyebrow">{pageCopy.appEyebrow}</span>
            <h2>{pageCopy.appTitle}</h2>
            <p>{pageCopy.appText}</p>
            <StoreButtons compact />
          </div>
          <div className="benefit-list">
            {pageCopy.benefits.map((benefit, index) => (
              <div className="benefit-item" key={benefit}>
                <span>0{index + 1}</span><p>{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{language === "en" ? "Across the country" : "Низ целата земја"}</span>
              <h2>{pageCopy.citySection}</h2>
            </div>
          </div>
          <div className="city-cloud">
            {cityStats.map(({ city, count }) => (
              <Link key={city} href={`${stationsPath}#city-${cityAnchor(city)}`} className="city-chip">
                {city} <span>{count}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-block" id="faq">
          <div className="section-heading">
            <div><span className="eyebrow">FAQ</span><h2>{pageCopy.faqTitle}</h2></div>
          </div>
          <dl className="faq-grid">
            {pageCopy.faqItems.map((item) => (
              <div className="faq-item" key={item.question}>
                <dt>{item.question}</dt><dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <SiteFooter language={language} />
    </main>
  );
}
