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
  title: "За нас",
  description:
    "Дознајте повеќе за MK Live Radio, независната платформа за едноставен пристап до македонските радио станици низ целиот свет.",
  keywords: [...SEO_KEYWORDS, "за MK Live Radio", "македонско радио во странство"],
  alternates: {
    canonical: "/about",
    languages: { mk: "/about", en: "/en/about", "x-default": "/about" },
  },
  openGraph: {
    type: "article",
    locale: "mk_MK",
    url: absoluteUrl("/about"),
    title: "За MK Live Radio",
    description:
      "Независен, приватно финансиран проект кој го прави македонското радио достапно насекаде.",
  },
};

const intro = [
  "Проектот е создаден од потребата македонската музика, говор, вести, култура и радио-програма да бидат лесно достапни не само во Македонија, туку и за Македонците кои живеат, работат, студираат или патуваат во странство.",
  "Преку MK Live Radio, корисниците можат да ги слушаат своите омилени радио станици на едно место, без потреба да пребаруваат различни веб-страници, индивидуални стримови или апликации со различен квалитет и корисничко искуство.",
  "Апликацијата е наменета за секојдневно користење — дома, на работа, во движење, во теретана, при патување или во автомобил. Главната цел е слушањето радио да биде достапно со што е можно помалку чекори и без непотребни пречки.",
];

const sections: AboutSection[] = [
  {
    title: "Нашата идеја",
    blocks: [
      { type: "paragraph", text: "Радиото и понатаму има важна улога во секојдневниот живот. Тоа не е само извор на музика, туку и директна врска со јазикот, културата, актуелните случувања и атмосферата од Македонија." },
      { type: "paragraph", text: "За луѓето кои живеат надвор од земјата, локалното радио често претставува едноставен начин повторно да се почувствува блискоста со домот. Познат глас, локална емисија, македонска песна или вести од родниот град можат да создадат чувство на поврзаност кое тешко се заменува со глобалните музички платформи." },
      { type: "paragraph", text: "Токму затоа, MK Live Radio не се обидува да биде уште една класична музичка апликација. Проектот е фокусиран конкретно на македонските радио станици и на создавање централизирано место од кое тие можат лесно да се пронајдат и слушаат." },
    ],
  },
  {
    title: "Нашата мисија",
    blocks: [
      { type: "paragraph", text: "MK Live Radio е независен и приватно финансиран проект. Не сме во сопственост на радио станица, медиум, политичка организација или државна институција." },
      { type: "paragraph", text: "Приходите од реклами и доброволна поддршка најпрво се користат за основните трошоци за развој и одржување на проектот." },
      { type: "paragraph", text: "Доколку во иднина приходите ги надминат трошоците за развој и одржување, нашата намера е преостанатите средства да бидат донирани за хуманитарни цели.", highlight: true, highlightLabel: "Хуманитарна заложба" },
      { type: "paragraph", text: "Кога ќе започнат донациите, јавно и транспарентно ќе ги објавуваме износите и организациите што ги добиле средствата." },
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="site-page">
      <SiteHeader language="mk" active="about" languagePath="/en/about" />
      <article className="site-shell about-page">
        <header className="about-hero">
          <div>
            <span className="eyebrow">Нашата приказна</span>
            <h1>За MK Live Radio</h1>
            <StoreButtons className="about-hero__stores" compact />
          </div>
          <p className="about-hero__lead">
            <strong>MK Live Radio</strong> е независен, приватно финансиран и непрофитно
            ориентиран дигитален проект чија цел е да овозможи едноставен, брз и практичен
            пристап до македонските радио станици од која било точка во светот.
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
      <SiteFooter language="mk" />
    </main>
  );
}
