import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";
import { findCityBySlug, getCities, getCityPath } from "@/lib/cities";
import { absoluteUrl, DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_NAME } from "@/lib/seo";
import { getStationDisplayName, getStationPath, pickStationLogoName } from "@/lib/stations";

type CityLanguage = "mk" | "en";

export function generateCityStaticParams() {
  return getCities().map((city) => ({ city: city.slug }));
}

export function generateCityMetadata(slug: string, language: CityLanguage): Metadata {
  const city = findCityBySlug(slug);
  if (!city) {
    return { title: "City Not Found", robots: { index: false, follow: false } };
  }

  const isEn = language === "en";
  const count = city.stations.length;
  const canonical = getCityPath(city.slug, language);
  const title = isEn ? `${city.nameEn} Radio Stations Live` : `Радио ${city.nameMk} во живо`;
  const description = isEn
    ? `Listen live to ${count} radio station${count === 1 ? "" : "s"} from ${city.nameEn}, North Macedonia, on MK Live Radio.`
    : `Слушај ги во живо сите ${count} радио станици од ${city.nameMk} на едно место, преку MK Live Radio.`;

  return {
    title,
    description,
    keywords: [
      ...SEO_KEYWORDS,
      `${city.nameEn} radio`,
      `${city.nameEn} radio stations`,
      `радио ${city.nameMk}`,
      `${city.nameMk} радио во живо`,
    ],
    alternates: {
      canonical,
      languages: {
        mk: getCityPath(city.slug, "mk"),
        en: getCityPath(city.slug, "en"),
        "x-default": getCityPath(city.slug, "mk"),
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "mk_MK",
      alternateLocale: isEn ? ["mk_MK"] : ["en_US"],
      url: absoluteUrl(canonical),
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: `${city.nameEn} radio stations on MK Live Radio` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

export default function CityPage({ slug, language }: { slug: string; language: CityLanguage }) {
  const city = findCityBySlug(slug);
  if (!city) notFound();

  const isEn = language === "en";
  const cityName = isEn ? city.nameEn : city.nameMk;
  const homePath = isEn ? "/en" : "/";
  const directoryPath = isEn ? "/en/stations" : "/stations";
  const canonicalUrl = absoluteUrl(getCityPath(city.slug, language));
  const otherCities = getCities().filter((candidate) => candidate.slug !== city.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: isEn ? `${city.nameEn} radio stations` : `Радио станици од ${city.nameMk}`,
        isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: SITE_NAME, url: absoluteUrl("/") },
        inLanguage: language,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: city.stations.map((station, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: getStationDisplayName(station, language),
            url: absoluteUrl(`${isEn ? "/en" : ""}${getStationPath(station)}`),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "MK Live Radio", item: absoluteUrl(homePath) },
          { "@type": "ListItem", position: 2, name: isEn ? "Radio stations" : "Радио станици", item: absoluteUrl(directoryPath) },
          { "@type": "ListItem", position: 3, name: cityName, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main lang={language} className="site-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader language={language} active="stations" languagePath={getCityPath(city.slug, isEn ? "mk" : "en")} />

      <div className="site-shell">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li><Link href={homePath}>MK Live Radio</Link></li><li aria-hidden>›</li>
            <li><Link href={directoryPath}>{isEn ? "Radio stations" : "Радио станици"}</Link></li><li aria-hidden>›</li>
            <li>{cityName}</li>
          </ol>
        </nav>

        <section className="page-hero">
          <span className="eyebrow">{isEn ? "Radio by city" : "Радио по град"}</span>
          <h1>{isEn ? `${city.nameEn} radio stations` : `Радио станици од ${city.nameMk}`}</h1>
          <p className="page-hero__intro">
            {isEn
              ? `All ${city.stations.length} stations from ${city.nameEn} in one place. Pick one to listen live, or get the app to keep your favorites close.`
              : `Сите ${city.stations.length} станици од ${city.nameMk} на едно место. Избери една и слушај во живо, или симни ја апликацијата за омилените станици да ти се секогаш при рака.`}
          </p>
          <StoreButtons compact placement="city_page" />
        </section>
      </div>

      <div className="site-shell">
        <ul className="station-directory-grid">
          {city.stations.map((station) => {
            const stationName = getStationDisplayName(station, language);
            const stationPath = `${isEn ? "/en" : ""}${getStationPath(station)}`;
            return (
              <li className="directory-card" key={station.id}>
                <div className="directory-card__head">
                  <Image src={`/logos/${pickStationLogoName(station)}.webp`} alt={`${stationName} logo`} width={54} height={54} loading="lazy" />
                  <div><h2>{stationName}</h2><p>{cityName}</p></div>
                </div>
                <p>{isEn ? `Listen to ${stationName} live from ${cityName}.` : `Слушај ${stationName} во живо од ${cityName}.`}</p>
                <div className="directory-card__actions">
                  <Link href={stationPath}>{isEn ? "Station page" : "Страница на станицата"} →</Link>
                  <Link href={`${isEn ? "/en" : ""}/webplayer?id=${station.id}`}>{isEn ? "Listen now" : "Слушај сега"}</Link>
                </div>
              </li>
            );
          })}
        </ul>

        <section className="section-block city-directory-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{isEn ? "More cities" : "Други градови"}</span>
              <h2>{isEn ? "Radio from other cities" : "Радио од други градови"}</h2>
            </div>
          </div>
          <div className="city-cloud">
            {otherCities.map((other) => (
              <Link key={other.slug} href={getCityPath(other.slug, language)} className="city-chip">
                {isEn ? other.nameEn : other.nameMk} <span>{other.stations.length}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter language={language} />
    </main>
  );
}
