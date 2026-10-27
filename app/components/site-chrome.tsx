import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/seo";
import { MobileMenu } from "@/app/components/mobile-menu";

export type SiteLanguage = "mk" | "en";

function pathFor(language: SiteLanguage, path: string) {
  return language === "en" ? `/en${path === "/" ? "" : path}` : path;
}

// Client component: orders the stores by the visitor's phone and tracks clicks
export { StoreButtons } from "@/app/components/store-buttons";

export function SiteHeader({
  language,
  active,
  languagePath,
}: {
  language: SiteLanguage;
  active?: "home" | "stations" | "player" | "about";
  languagePath?: string;
}) {
  const isEn = language === "en";

  return (
    <header className="site-header">
      <Link href={pathFor(language, "/")} className="brand-lockup" aria-label="MK Live Radio home">
        <Image src="/logo.png" alt="" width={46} height={46} priority />
        <span>
          <strong>MK Live Radio</strong>
          <small>{isEn ? "Macedonia on air" : "Македонија во етер"}</small>
        </span>
      </Link>

      <nav className="site-nav" aria-label={isEn ? "Main navigation" : "Главна навигација"}>
        <Link
          href={pathFor(language, "/stations")}
          aria-current={active === "stations" ? "page" : undefined}
        >
          {isEn ? "Stations" : "Станици"}
        </Link>
        <Link
          href={pathFor(language, "/webplayer")}
          aria-current={active === "player" ? "page" : undefined}
        >
          Web Player
        </Link>
        <Link
          href={pathFor(language, "/about")}
          aria-current={active === "about" ? "page" : undefined}
        >
          {isEn ? "About" : "За нас"}
        </Link>
        <Link
          href={languagePath ?? (isEn ? "/" : "/en")}
          hrefLang={isEn ? "mk" : "en"}
          className="language-link"
          aria-label={isEn ? "Македонски" : "English"}
        >
          <Image
            src={isEn ? "https://flagcdn.com/w40/mk.png" : "https://flagcdn.com/w40/gb.png"}
            alt=""
            width={22}
            height={15}
          />
        </Link>
        <Link className="header-download" href={`${pathFor(language, "/")}#download-app`}>
          {isEn ? "Download MK Live Radio" : "Симни MK Live Radio"}
          <span aria-hidden>↓</span>
        </Link>

        <MobileMenu
          isEn={isEn}
          stationsPath={pathFor(language, "/stations")}
          playerPath={pathFor(language, "/webplayer")}
          aboutPath={pathFor(language, "/about")}
          downloadPath={`${pathFor(language, "/")}#download-app`}
          active={active}
        />
      </nav>
    </header>
  );
}

export function SiteFooter({ language }: { language: SiteLanguage }) {
  const isEn = language === "en";

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <Image src="/logo.png" alt="" width={42} height={42} />
        <div>
          <strong>MK Live Radio</strong>
          <span>{isEn ? "Your Macedonia. Always on." : "Твојата Македонија. Секогаш во етер."}</span>
        </div>
      </div>
      <div className="site-footer__links">
        <Link href={pathFor(language, "/stations")}>{isEn ? "Stations" : "Станици"}</Link>
        <Link href={pathFor(language, "/webplayer")}>Web Player</Link>
        <Link href={pathFor(language, "/about")}>{isEn ? "About" : "За нас"}</Link>
        <Link href={pathFor(language, "/privacy")}>{isEn ? "Privacy" : "Приватност"}</Link>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <p>© {new Date().getFullYear()} MK Live Radio · Made in Macedonia</p>
    </footer>
  );
}
