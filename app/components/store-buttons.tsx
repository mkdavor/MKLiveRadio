"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/seo";

export type MobilePlatform = "ios" | "android";
type Store = "app_store" | "google_play";

/** "ios" for iPhone/iPad (iPadOS reports a Mac user agent with touch), "android", or null on desktop. */
export function useMobilePlatform(): MobilePlatform | null {
  const [platform, setPlatform] = useState<MobilePlatform | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
      setPlatform("ios");
    } else if (/Android/i.test(ua)) {
      setPlatform("android");
    }
  }, []);

  return platform;
}

/** Store clicks are the website's install funnel; only sent when analytics consent was given. */
export function trackStoreClick(store: Store, placement: string) {
  trackEvent("store_click", { store, placement, page_path: window.location.pathname });
}

export function StoreButtons({
  className = "",
  compact = false,
  placement = "page",
}: {
  className?: string;
  compact?: boolean;
  placement?: string;
}) {
  const platform = useMobilePlatform();

  const appStore = (
    <a
      key="app_store"
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="store-button"
      aria-label="Download MK Live Radio on the App Store"
      onClick={() => trackStoreClick("app_store", placement)}
    >
      <span className="store-button__platform">iPhone &amp; iPad</span>
      <Image src="/appstore.svg" alt="Download on the App Store" width={168} height={56} />
    </a>
  );

  const googlePlay = (
    <a
      key="google_play"
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="store-button"
      aria-label="Get MK Live Radio on Google Play"
      onClick={() => trackStoreClick("google_play", placement)}
    >
      <span className="store-button__platform">Android</span>
      <Image src="/playstore.svg" alt="Get it on Google Play" width={189} height={56} />
    </a>
  );

  // Visitors on a phone see their own store first
  const buttons = platform === "android" ? [googlePlay, appStore] : [appStore, googlePlay];

  return (
    <div className={`store-buttons ${compact ? "store-buttons--compact" : ""} ${className}`}>
      {buttons}
    </div>
  );
}

/** Phone-only prompt to listen in the app instead of the browser. */
export function MobileAppBanner({ language, placement }: { language: "mk" | "en"; placement: string }) {
  const platform = useMobilePlatform();
  if (!platform) {
    return null;
  }

  const store: Store = platform === "ios" ? "app_store" : "google_play";
  const mk = language === "mk";

  return (
    <a
      className="mobile-app-banner"
      href={platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackStoreClick(store, placement)}
    >
      <Image src="/logo.png" alt="" width={44} height={44} className="mobile-app-banner__icon" />
      <span className="mobile-app-banner__text">
        <strong>{mk ? "Слушај во апликацијата" : "Listen in the app"}</strong>
        <small>{mk ? "Сите станици, омилени и слушање во позадина" : "All stations, favorites and background listening"}</small>
      </span>
      <span className="mobile-app-banner__cta">{mk ? "Симни" : "Get"}</span>
    </a>
  );
}
