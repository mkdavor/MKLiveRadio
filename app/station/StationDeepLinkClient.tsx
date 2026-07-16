"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stations } from "@/lib/stations";
import { StoreButtons } from "@/app/components/site-chrome";

type Station = {
  id: number;
  name: string;
};

export default function StationPage() {
  const [stationName, setStationName] = useState<string | null>(null);
  const [stationId, setStationId] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("id");
    const id = value ? Number(value) : null;

    if (id === null || Number.isNaN(id)) {
      return;
    }

    const match = (stations as Station[]).find((station) => station.id === id);
    setStationName(match?.name ?? null);
    setStationId(id);

    const ua = navigator.userAgent || "";
    const iosLike = /iPhone|iPad|iPod/i.test(ua);
    const iPadOS = /Macintosh|Mac OS X/i.test(ua) && navigator.maxTouchPoints > 1;
    const macOS = /Macintosh|Mac OS X/i.test(ua);
    const isApple = iosLike || iPadOS || macOS;
    const isAndroid = /Android/i.test(ua);

    if (isApple) {
      const iosDeepLink = `mkliveradio://station?id=${id}`;
      window.location.href = iosDeepLink;
      return;
    }

    if (isAndroid) {
      const androidIntent = `intent://station?id=${id}#Intent;scheme=mkliveradio;package=app.mkliveradio.android;end`;
      window.location.href = androidIntent;
    }
  }, []);

  return (
    <main className="deeplink-page">
      <section className="deeplink-card">
        <div className="deeplink-mark">
          <Image src="/logo.png" alt="MK Live Radio" width={104} height={104} priority />
        </div>
        <span className="eyebrow">OPEN IN APP</span>
        <h1>{stationName ? `Слушај ${stationName}` : "Отвори MK Live Radio"}</h1>
        <p>Ако апликацијата не се отвори автоматски, симни ја за iPhone, iPad или Android.</p>
        <StoreButtons />
        <Link href={`/webplayer${stationId !== null ? `?id=${stationId}` : ""}`} className="secondary-link secondary-link--muted">
          Продолжи во web player →
        </Link>
      </section>
      <p className="deeplink-footer">© {new Date().getFullYear()} MK Live Radio · Made in Macedonia</p>
    </main>
  );
}
