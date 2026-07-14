import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  PLAY_STORE_URL,
  SEO_KEYWORDS,
  SITE_NAME,
} from "@/lib/seo";
import { getStationArticle, resolveStationArticleLanguage } from "@/lib/station-articles";
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
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export function generateStaticParams() {
  return stations.map((station) => ({ slug: getStationSlug(station) }));
}

export async function generateMetadata({
  params,
  searchParams,
}: StationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = (await searchParams) ?? {};
  const language = resolveStationArticleLanguage(lang);
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
  const pagePath = getStationPath(station);
  const article = getStationArticle(station, language);
  const canonicalPath = language === "mk" ? article.alternatePathMk : article.alternatePathEn;

  return {
    title: article.title,
    description: article.description,
    keywords: [...SEO_KEYWORDS, ...article.keywords],
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${pagePath}?lang=en`,
        mk: pagePath,
        "x-default": pagePath,
      },
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

export default async function StationSeoPage({ params, searchParams }: StationPageProps) {
  const { slug } = await params;
  const { lang } = (await searchParams) ?? {};
  const language = resolveStationArticleLanguage(lang);
  const station = findStationBySlug(slug);

  if (!station) {
    notFound();
  }

  const stationName = getStationDisplayName(station, "en");
  const stationNameMk = getStationDisplayName(station, "mk");
  const stationCity = getStationDisplayCity(station, "en");
  const stationCityMk = getStationDisplayCity(station, "mk");
  const pagePath = getStationPath(station);
  const article = getStationArticle(station, language);
  const directoryPath = language === "en" ? "/stations?lang=en" : "/stations";
  const homePath = language === "en" ? "/en" : "/";
  const canonicalPath = language === "en" ? article.alternatePathEn : article.alternatePathMk;
  const listenUrl = `/webplayer?id=${station.id}`;
  const canonicalUrl = absoluteUrl(canonicalPath);
  const pageId = `${canonicalUrl}#webpage`;
  const stationId = `${canonicalUrl}#radiostation`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const faqId = `${canonicalUrl}#faq`;
  const stationLogoUrl = absoluteUrl(`/logos/${pickStationLogoName(station)}.webp`);

  const radioStationSchema = {
    "@type": "RadioStation",
    "@id": stationId,
    name: stationName,
    alternateName: stationNameMk,
    url: station.website ?? canonicalUrl,
    mainEntityOfPage: {
      "@id": pageId,
    },
    areaServed: stationCity
      ? {
          "@type": "City",
          name: stationCity,
        }
      : "Macedonia",
    inLanguage: language,
    image: stationLogoUrl,
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": pageId,
    url: canonicalUrl,
    name: article.title,
    description: article.description,
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
    inLanguage: language,
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MK Live Radio",
        item: absoluteUrl(homePath),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "mk" ? "Македонски радио станици" : "Macedonian Radio Stations",
        item: absoluteUrl(directoryPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: language === "mk" ? stationNameMk : stationName,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": faqId,
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [webPageSchema, radioStationSchema, breadcrumbSchema, faqSchema],
          }),
        }}
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col items-start gap-4">
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
              href={pagePath}
              hrefLang="mk"
              aria-label="Switch to Macedonian"
              className={`flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                language === "mk"
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-gray-300 hover:border-white/50 hover:text-white"
              }`}
            >
              <Image src="https://flagcdn.com/w40/mk.png" alt="MK" width={16} height={12} />
              MK
            </Link>
            <Link
              href={`${pagePath}?lang=en`}
              hrefLang="en"
              aria-label="Switch to English"
              className={`flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                language === "en"
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-gray-300 hover:border-white/50 hover:text-white"
              }`}
            >
              <Image src="https://flagcdn.com/w40/gb.png" alt="EN" width={16} height={12} />
              EN
            </Link>
          </div>
        </header>

        <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={homePath}
                className="underline decoration-white/20 underline-offset-4 transition hover:decoration-white/70"
              >
                MK Live Radio
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link
                href={directoryPath}
                className="underline decoration-white/20 underline-offset-4 transition hover:decoration-white/70"
              >
                {language === "mk" ? "Македонски радио станици" : "Macedonian Radio Stations"}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-gray-200">{language === "mk" ? stationNameMk : stationName}</li>
          </ol>
        </nav>

        <article className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
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
              <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
              <p className="mt-2 text-sm text-gray-300">
                {language === "mk"
                  ? `${stationCityMk ? `Град: ${stationCityMk}` : "Македонска радио станица"} · Онлајн live стрим`
                  : `${stationCity ? `City: ${stationCity}` : "Macedonian radio station"} · Online live stream`}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-base leading-8 text-gray-200">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
                <div className="mt-2 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {article.facts.map((fact) => (
              <div key={fact.labelEn} className="rounded-lg border border-white/10 bg-black/35 p-4">
                <dt className="text-xs font-semibold uppercase text-gray-500">
                  {language === "mk" ? fact.labelMk : fact.labelEn}
                </dt>
                <dd className="mt-1 break-words text-sm text-gray-200">
                  {fact.labelEn === "Official website" ? (
                    <a
                      href={fact.valueEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline decoration-white/30 underline-offset-4 transition hover:text-[#e26156] hover:decoration-[#e26156]"
                    >
                      {language === "mk" ? fact.valueMk : fact.valueEn}
                    </a>
                  ) : (
                    language === "mk" ? fact.valueMk : fact.valueEn
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col items-start gap-4">
            <Link
              href={listenUrl}
              className="group inline-flex items-center gap-2 rounded-full border border-[#c63a2e]/45 bg-gradient-to-r from-[#c63a2e]/26 via-[#d14a3f]/22 to-[#8f2018]/24 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(198,58,46,0.28)] transition duration-300 hover:scale-[1.03] hover:border-[#e26156]/75 hover:shadow-[0_0_38px_rgba(198,58,46,0.48)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#e26156] transition group-hover:bg-[#ff8478]" />
              {language === "mk" ? "Отвори web player" : "Open Web Player"}
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

          <section className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold">
              {language === "mk" ? "Често поставувани прашања" : "Frequently Asked Questions"}
            </h2>
            <dl className="mt-4 space-y-4">
              {article.faq.map((item) => (
                <div key={item.question}>
                  <dt className="font-semibold text-white">{item.question}</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-300">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <footer className="border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
        </footer>
      </div>
    </main>
  );
}
