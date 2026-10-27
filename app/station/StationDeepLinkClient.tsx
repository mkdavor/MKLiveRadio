"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stations } from "@/lib/stations";
import { PLAY_STORE_URL } from "@/lib/seo";
import { StoreButtons } from "@/app/components/site-chrome";

type Station = {
  id: number;
  name: string;
  name_en: string;
};

// Play Store listing tagged as coming from a shared station link
const PLAY_STORE_FALLBACK = `${PLAY_STORE_URL}&referrer=${encodeURIComponent("utm_source=mkliveradio.app&utm_medium=station_link")}`;

export default function StationPage() {
  const [station, setStation] = useState<Station | null>(null);
  const [stationId, setStationId] = useState<number | null>(null);
  const [isAppleMobile, setIsAppleMobile] = useState(false);
  const [english, setEnglish] = useState(false);
  const [iosDeepLink, setIosDeepLink] = useState("mkliveradio://");

  useEffect(() => {
    setEnglish(!navigator.language.toLowerCase().startsWith("mk"));

    const params = new URLSearchParams(window.location.search);
    const value = params.get("id");
    const id = value ? Number(value) : null;

    if (id === null || Number.isNaN(id)) {
      return;
    }

    setStation((stations as Station[]).find((candidate) => candidate.id === id) ?? null);
    setStationId(id);
    setIosDeepLink(`mkliveradio://station?id=${id}`);

    const ua = navigator.userAgent || "";
    const iosLike = /iPhone|iPad|iPod/i.test(ua);
    const iPadOS = /Macintosh|Mac OS X/i.test(ua) && navigator.maxTouchPoints > 1;
    const isAndroid = /Android/i.test(ua);

    // iPhones with the app installed never load this page (the universal link opens the app),
    // so instead of a scheme redirect that fails without the app, offer an "Open in the app" button.
    // Desktop Macs have no app to open and stay here.
    setIsAppleMobile(iosLike || iPadOS);

    if (isAndroid) {
      // Opens the app when installed, otherwise Chrome goes to the Play Store listing
      const fallback = encodeURIComponent(PLAY_STORE_FALLBACK);
      const androidIntent = `intent://station?id=${id}#Intent;scheme=mkliveradio;package=app.mkliveradio.android;S.browser_fallback_url=${fallback};end`;
      window.location.href = androidIntent;
    }
  }, []);

  const stationName = station ? (english ? station.name_en : station.name) : null;

  return (
    <main className="deeplink-page">
      <section className="deeplink-card">
        <div className="deeplink-mark">
          <Image src="/logo.png" alt="MK Live Radio" width={104} height={104} priority />
        </div>
        <span className="eyebrow">{english ? "OPEN IN APP" : "ОТВОРИ ВО АПЛИКАЦИЈАТА"}</span>
        <h1>
          {stationName
            ? english ? `Listen to ${stationName}` : `Слушај ${stationName}`
            : english ? "Open MK Live Radio" : "Отвори MK Live Radio"}
        </h1>
        <p>
          {english
            ? "Get the app for iPhone, iPad or Android, or keep listening in your browser."
            : "Симни ја апликацијата за iPhone, iPad или Android, или продолжи да слушаш во прелистувачот."}
        </p>
        {isAppleMobile ? (
          <a href={iosDeepLink} className="deeplink-open">
            {english ? "Open in the app" : "Отвори во апликацијата"}
          </a>
        ) : null}
        <StoreButtons placement="station_link" />
        <Link href={`${english ? "/en" : ""}/webplayer${stationId !== null ? `?id=${stationId}` : ""}`} className="secondary-link secondary-link--muted">
          {english ? "Continue in the web player →" : "Продолжи во web player →"}
        </Link>
      </section>
      <p className="deeplink-footer">© {new Date().getFullYear()} MK Live Radio · Made in Macedonia</p>
    </main>
  );
}
