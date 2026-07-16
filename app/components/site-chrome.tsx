import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, INSTAGRAM_URL, PLAY_STORE_URL } from "@/lib/seo";

export type SiteLanguage = "mk" | "en";

function pathFor(language: SiteLanguage, path: string) {
  return language === "en" ? `/en${path === "/" ? "" : path}` : path;
}

export function StoreButtons({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`store-buttons ${compact ? "store-buttons--compact" : ""} ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="store-button"
        aria-label="Download MK Live Radio on the App Store"
      >
        <span className="store-button__platform">iPhone &amp; iPad</span>
        <Image src="/appstore.svg" alt="Download on the App Store" width={168} height={56} />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="store-button"
        aria-label="Get MK Live Radio on Google Play"
      >
        <span className="store-button__platform">Android</span>
        <Image src="/playstore.svg" alt="Get it on Google Play" width={189} height={56} />
      </a>
    </div>
  );
}

export function SiteHeader({
  language,
  active,
}: {
  language: SiteLanguage;
  active?: "home" | "stations" | "player";
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
          href={isEn ? "/" : "/en"}
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
        <Link href={pathFor(language, "/privacy")}>{isEn ? "Privacy" : "Приватност"}</Link>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <p>© {new Date().getFullYear()} MK Live Radio · Made in Macedonia</p>
    </footer>
  );
}
