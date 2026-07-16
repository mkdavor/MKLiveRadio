import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";
import { absoluteUrl, DEFAULT_OG_IMAGE, SEO_KEYWORDS, SITE_NAME } from "@/lib/seo";
import { getStationArticle, type StationArticleLanguage } from "@/lib/station-articles";
import {
  findStationBySlug,
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
  getStationSlug,
  pickStationLogoName,
  stations,
} from "@/lib/stations";

export function generateStationStaticParams() {
  return stations.map((station) => ({ slug: getStationSlug(station) }));
}

export async function generateStationMetadata(slug: string, language: StationArticleLanguage): Promise<Metadata> {
  const station = findStationBySlug(slug);
  if (!station) {
    return { title: "Station Not Found", robots: { index: false, follow: false } };
  }

  const stationName = getStationDisplayName(station, "en");
  const pagePath = getStationPath(station);
  const article = getStationArticle(station, language);
  const canonicalPath = language === "mk" ? article.alternatePathMk : article.alternatePathEn;

  return {
    title: article.title,
    description: article.description,
    keywords: [...SEO_KEYWORDS, ...article.keywords],
    alternates: {
      canonical: canonicalPath,
      languages: { en: `/en${pagePath}`, mk: pagePath, "x-default": pagePath },
    },
    openGraph: {
      type: "music.radio_station",
      locale: language === "mk" ? "mk_MK" : "en_US",
      alternateLocale: language === "mk" ? ["en_US"] : ["mk_MK"],
      url: absoluteUrl(canonicalPath),
      title: article.title,
      description: article.description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: `${stationName} live on MK Live Radio` }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    other: {
      "content-language": language,
      "article:section": "Macedonian radio stations",
      "article:tag": article.keywords.slice(0, 8).join(", "),
    },
  };
}

export default function StationDetailPage({ slug, language }: { slug: string; language: StationArticleLanguage }) {
  const station = findStationBySlug(slug);
  if (!station) notFound();

  const stationName = getStationDisplayName(station, "en");
  const stationNameMk = getStationDisplayName(station, "mk");
  const stationCity = getStationDisplayCity(station, "en");
  const stationCityMk = getStationDisplayCity(station, "mk");
  const article = getStationArticle(station, language);
  const directoryPath = language === "en" ? "/en/stations" : "/stations";
  const homePath = language === "en" ? "/en" : "/";
  const canonicalPath = language === "en" ? article.alternatePathEn : article.alternatePathMk;
  const listenUrl = `${language === "en" ? "/en" : ""}/webplayer?id=${station.id}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const pageId = `${canonicalUrl}#webpage`;
  const stationId = `${canonicalUrl}#radiostation`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const faqId = `${canonicalUrl}#faq`;
  const stationLogoUrl = absoluteUrl(`/logos/${pickStationLogoName(station)}.webp`);
  const displayName = language === "mk" ? stationNameMk : stationName;
  const displayCity = language === "mk" ? stationCityMk : stationCity;

  const relatedStations = stations
    .filter((candidate) => candidate.slug !== station.slug && candidate.city === station.city);

  const radioStationSchema = {
    "@type": "RadioStation", "@id": stationId, name: stationName, alternateName: stationNameMk,
    url: station.website ?? canonicalUrl, mainEntityOfPage: { "@id": pageId },
    areaServed: stationCity ? { "@type": "City", name: stationCity } : "Macedonia",
    inLanguage: language, image: stationLogoUrl,
  };
  const webPageSchema = {
    "@type": "WebPage", "@id": pageId, url: canonicalUrl, name: article.title, description: article.description,
    isPartOf: { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: SITE_NAME, url: absoluteUrl("/") },
    primaryImageOfPage: { "@type": "ImageObject", url: stationLogoUrl },
    breadcrumb: { "@id": breadcrumbId }, mainEntity: { "@id": stationId }, inLanguage: language,
  };
  const breadcrumbSchema = {
    "@type": "BreadcrumbList", "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MK Live Radio", item: absoluteUrl(homePath) },
      { "@type": "ListItem", position: 2, name: language === "mk" ? "Македонски радио станици" : "Macedonian Radio Stations", item: absoluteUrl(directoryPath) },
      { "@type": "ListItem", position: 3, name: displayName, item: canonicalUrl },
    ],
  };
  const faqSchema = {
    "@type": "FAQPage", "@id": faqId,
    mainEntity: article.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };

  return (
    <main lang={language} className="site-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, radioStationSchema, breadcrumbSchema, faqSchema] }) }}
      />
      <SiteHeader language={language} active="stations" />

      <div className="site-shell">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li><Link href={homePath}>MK Live Radio</Link></li><li aria-hidden>›</li>
            <li><Link href={directoryPath}>{language === "mk" ? "Радио станици" : "Radio stations"}</Link></li><li aria-hidden>›</li>
            <li>{displayName}</li>
          </ol>
        </nav>

        <section className="station-hero">
          <div className="station-artwork">
            <Image src={`/logos/${pickStationLogoName(station)}.webp`} alt={`${stationName} logo`} width={320} height={320} priority />
          </div>
          <div>
            <span className="eyebrow">{language === "mk" ? "Македонско радио во живо" : "Macedonian radio live"}</span>
            <h1>{displayName}</h1>
            <p className="station-hero__meta">
              {displayCity ? `${displayCity} · ` : ""}{language === "mk" ? "Достапно во MK Live Radio" : "Available in MK Live Radio"}
            </p>
            <StoreButtons compact />
            <div className="secondary-links">
              <Link href={listenUrl} className="secondary-link secondary-link--muted">
                {language === "mk" ? "Отвори web player" : "Open the web player"} →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="site-shell">
        <article className="editorial-article">
          {article.sections.map((section) => (
            <section className="editorial-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <div className="editorial-section__copy">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}

          {article.principles?.length ? (
            <section>
              <div className="section-heading">
                <div><span className="eyebrow">{language === "mk" ? "Програмски вредности" : "Programming values"}</span><h2>{displayName}</h2></div>
              </div>
              <div className="detail-grid">
                {article.principles.map((principle) => (
                  <div className="detail-card" key={principle.title}>
                    <small>{language === "mk" ? "Вредност" : "Value"}</small>
                    <strong>{principle.title}</strong><p>{principle.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <dl className="facts-grid station-facts">
            {article.facts.map((fact) => (
              <div className="fact-item" key={fact.labelEn}>
                <dt>{language === "mk" ? fact.labelMk : fact.labelEn}</dt>
                <dd>
                  {fact.labelEn === "Official website" ? (
                    <a href={fact.valueEn} target="_blank" rel="noopener noreferrer">{language === "mk" ? fact.valueMk : fact.valueEn}</a>
                  ) : language === "mk" ? fact.valueMk : fact.valueEn}
                </dd>
              </div>
            ))}
          </dl>

          {article.team?.length ? (
            <section>
              <div className="section-heading"><div><span className="eyebrow">{language === "mk" ? "Во етер" : "On air"}</span><h2>{language === "mk" ? "Луѓето зад микрофонот" : "People behind the microphone"}</h2></div></div>
              <div className="detail-grid station-roster">
                {article.team.map((member) => <div className="detail-card" key={member.name}><strong>{member.name}</strong><p>{member.role}</p></div>)}
              </div>
            </section>
          ) : null}

          {article.contacts?.length ? (
            <section>
              <div className="section-heading"><div><span className="eyebrow">Contact</span><h2>{language === "mk" ? "Контакт со Jazz FM" : "Contact Jazz FM"}</h2></div></div>
              <div className="detail-grid station-contacts">
                {article.contacts.map((contact) => (
                  <a className="detail-card" key={contact.label} href={contact.href}>
                    <small>{contact.label}</small><strong>{contact.value}</strong>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <aside className="inline-app-cta">
            <h2>{language === "mk" ? `Слушај ${displayName} во апликацијата.` : `Listen to ${displayName} in the app.`}</h2>
            <p>{language === "mk" ? "Најбрзиот пат до оваа и сите други македонски радио станици." : "The fastest way to this station and every other Macedonian radio station."}</p>
            <StoreButtons compact />
          </aside>

          <section id="faq">
            <div className="section-heading"><div><span className="eyebrow">FAQ</span><h2>{language === "mk" ? "Често поставувани прашања" : "Frequently asked questions"}</h2></div></div>
            <dl className="faq-grid station-faq">
              {article.faq.map((item) => <div className="faq-item" key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}
            </dl>
          </section>

          {relatedStations.length ? (
            <section className="section-block">
              <div className="section-heading"><div><span className="eyebrow">{displayCity}</span><h2>{language === "mk" ? "Уште станици од градот" : "More stations from the city"}</h2></div></div>
              <div className="station-showcase station-showcase--city">
                {relatedStations.map((related, index) => (
                  <Link className="station-tile" href={`${language === "en" ? "/en" : ""}${getStationPath(related)}`} key={related.id}>
                    <span className="station-tile__top">
                      <Image src={`/logos/${pickStationLogoName(related)}.webp`} alt={`${getStationDisplayName(related, language)} logo`} width={72} height={72} />
                      <span className="station-tile__index">{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <span><strong>{getStationDisplayName(related, language)}</strong><small>{getStationDisplayCity(related, language)}</small></span>
                    <span className="station-tile__arrow" aria-hidden>↗</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </div>
      <SiteFooter language={language} />
    </main>
  );
}
