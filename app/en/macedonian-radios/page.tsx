import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getStationDisplayCity, getStationDisplayName, getStationPath, pickStationLogoName, stations } from "@/lib/stations";

export const metadata: Metadata = {
  title: "Macedonian Radios Online",
  description: "Listen to Macedonian radios online with MK Live Radio. Stream local FM and online stations for free on web, iOS, and Android.",
  keywords: ["Macedonian radios", "Macedonian radio online", "Macedonian FM radio", "radio stations Macedonia", "MK Live Radio"],
  alternates: { canonical: "/en/macedonian-radios" },
  openGraph: {
    type: "website", url: absoluteUrl("/en/macedonian-radios"), title: "Macedonian Radios Online | MK Live Radio",
    description: "Free online streaming for Macedonian radio stations with web player and apps.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Macedonian radios online" }],
  },
};

export default function MacedonianRadiosPage() {
  const allStations = [...stations].sort((a, b) => getStationDisplayName(a, "en").localeCompare(getStationDisplayName(b, "en")));
  const stationListSchema = {
    "@context": "https://schema.org", "@type": "ItemList", name: "Macedonian radios and stations", numberOfItems: allStations.length,
    itemListElement: allStations.map((station, index) => ({ "@type": "ListItem", position: index + 1, name: getStationDisplayName(station, "en"), url: absoluteUrl(`/en${getStationPath(station)}`) })),
  };

  return (
    <main className="site-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stationListSchema) }} />
      <SiteHeader language="en" active="stations" />
      <div className="site-shell">
        <section className="page-hero">
          <span className="eyebrow">Macedonian radio directory</span>
          <h1>Macedonian radios, always within reach.</h1>
          <p className="page-hero__intro">MK Live Radio brings local FM, music, news, folk, pop and talk stations from across Macedonia into one focused mobile app.</p>
          <StoreButtons compact />
          <div className="secondary-links"><Link href="/en/stations" className="secondary-link">Browse by city →</Link></div>
        </section>

        <section className="section-block">
          <div className="section-heading"><div><span className="eyebrow">All stations</span><h2>Choose your frequency.</h2></div><p>Every station has a dedicated, shareable page with the available station facts and listening links.</p></div>
          <ul className="station-directory-grid">
            {allStations.map((station) => {
              const name = getStationDisplayName(station, "en");
              return (
                <li className="directory-card" key={station.id}>
                  <div className="directory-card__head">
                    <Image src={`/logos/${pickStationLogoName(station)}.webp`} alt={`${name} logo`} width={54} height={54} loading="lazy" />
                    <div><h3>{name}</h3><p>{getStationDisplayCity(station, "en") ?? "Macedonia"}</p></div>
                  </div>
                  <div className="directory-card__actions"><Link href={`/en${getStationPath(station)}`}>Station page →</Link></div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <SiteFooter language="en" />
    </main>
  );
}
