"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function MobileMenu({
  isEn,
  stationsPath,
  playerPath,
  aboutPath,
  downloadPath,
  active,
}: {
  isEn: boolean;
  stationsPath: string;
  playerPath: string;
  aboutPath?: string;
  downloadPath: string;
  active?: "home" | "stations" | "player" | "about";
}) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
    setIsOpen(false);
  }

  return (
    <details
      ref={menuRef}
      className="mobile-menu"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary aria-label={isOpen ? (isEn ? "Close menu" : "Затвори мени") : (isEn ? "Open menu" : "Отвори мени")}>
        <span className="mobile-menu__icon" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </summary>
      <div className="mobile-menu__panel">
        <span className="mobile-menu__label">{isEn ? "Menu" : "Мени"}</span>
        <Link
          href={stationsPath}
          aria-current={active === "stations" ? "page" : undefined}
          onClick={closeMenu}
        >
          <span>{isEn ? "Stations" : "Станици"}</span>
          <span aria-hidden>→</span>
        </Link>
        <Link
          href={playerPath}
          aria-current={active === "player" ? "page" : undefined}
          onClick={closeMenu}
        >
          <span>Web Player</span>
          <span aria-hidden>→</span>
        </Link>
        {aboutPath && (
          <Link
            href={aboutPath}
            aria-current={active === "about" ? "page" : undefined}
            onClick={closeMenu}
          >
            <span>{isEn ? "About" : "За нас"}</span>
            <span aria-hidden>→</span>
          </Link>
        )}
        <Link className="mobile-menu__download" href={downloadPath} onClick={closeMenu}>
          <span>{isEn ? "Download MK Live Radio" : "Симни MK Live Radio"}</span>
          <span aria-hidden>↓</span>
        </Link>
      </div>
    </details>
  );
}
