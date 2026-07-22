import type { Metadata } from "next";
import { SiteFooter, SiteHeader, StoreButtons } from "@/app/components/site-chrome";
import { absoluteUrl, SEO_KEYWORDS } from "@/lib/seo";

type Block =
  | { type: "paragraph"; text: string; highlight?: boolean; highlightLabel?: string }
  | { type: "list"; items: string[] };

type AboutSection = {
  title: string;
  blocks: Block[];
};

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about MK Live Radio, an independent platform making Macedonian radio stations easy to access worldwide.",
  keywords: [...SEO_KEYWORDS, "about MK Live Radio", "Macedonian radio abroad"],
  alternates: {
    canonical: "/en/about",
    languages: { mk: "/about", en: "/en/about", "x-default": "/about" },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: absoluteUrl("/en/about"),
    title: "About MK Live Radio",
    description:
      "An independent, privately funded project making Macedonian radio accessible everywhere.",
  },
};

const intro = [
  "The project grew from a need to make Macedonian music, voices, news, culture, and radio programming readily available—not only in Macedonia, but also to Macedonians living, working, studying, or travelling abroad.",
  "With MK Live Radio, listeners can enjoy their favourite stations in one place without searching through different websites, individual streams, or apps with inconsistent quality and user experience.",
  "The app is designed for everyday listening—at home, at work, on the move, at the gym, while travelling, or in the car. The goal is simple: choose a station and start listening with as few steps as possible.",
];

const sections: AboutSection[] = [
  {
    title: "Our idea",
    blocks: [
      { type: "paragraph", text: "Radio still has an important place in everyday life. It is more than a source of music—it is a direct connection to the language, culture, current events, and atmosphere of Macedonia." },
      { type: "paragraph", text: "For people living abroad, local radio can make home feel closer. A familiar voice, a local show, a Macedonian song, or news from a hometown creates a sense of connection that global music platforms cannot easily replace." },
      { type: "paragraph", text: "That is why MK Live Radio is not trying to be another general music app. It focuses specifically on Macedonian radio stations and brings them together in one place where they are easy to find and listen to." },
    ],
  },
  {
    title: "Our mission",
    blocks: [
      { type: "paragraph", text: "MK Live Radio is an independent, privately funded project. We are not owned by a radio station, media group, political organisation, or government institution." },
      { type: "paragraph", text: "Revenue from advertising and voluntary support is first used to cover the essential costs of developing and maintaining the project." },
      { type: "paragraph", text: "If revenue exceeds the costs of development and maintenance in the future, our intention is to donate the remaining funds to humanitarian causes.", highlight: true, highlightLabel: "Humanitarian commitment" },
      { type: "paragraph", text: "Once donations begin, we will publicly and transparently report the amounts and the organisations that receive them." },
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="site-page">
      <SiteHeader language="en" active="about" languagePath="/about" />
      <article className="site-shell about-page">
        <header className="about-hero">
          <div>
            <span className="eyebrow">Our story</span>
            <h1>About MK Live Radio</h1>
            <StoreButtons className="about-hero__stores" compact />
          </div>
          <p className="about-hero__lead">
            <strong>MK Live Radio</strong> is an independent, privately funded, nonprofit-oriented
            digital project created to provide simple, fast, and practical access to Macedonian
            radio stations from anywhere in the world.
          </p>
        </header>

        <div className="about-intro">
          {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <div className="about-sections">
          {sections.map((section) => (
            <section className="about-section" key={section.title}>
              <div className="about-section__heading"><h2>{section.title}</h2></div>
              <div className="about-section__content">
                {section.blocks.map((block, index) =>
                  block.type === "paragraph" ? (
                    <p className={block.highlight ? "about-donation-promise" : undefined} key={index}>
                      {block.highlightLabel && (
                        <span className="about-donation-promise__label">{block.highlightLabel}</span>
                      )}
                      {block.text}
                    </p>
                  ) : (
                    <ul className="about-list" key={index}>
                      {block.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
      <SiteFooter language="en" />
    </main>
  );
}
