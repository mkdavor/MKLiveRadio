"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import stations from "../../data/stations.json";

const APP_STORE_URL = "https://apps.apple.com/de/app/mk-live-radio/id6748603781";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.mkliveradio.android";

type Station = {
  id: number;
  name: string;
};

export default function StationPage() {
  const [stationName, setStationName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("id");
    const id = value ? Number(value) : null;

    if (id === null || Number.isNaN(id)) {
      return;
    }

    const match = (stations as Station[]).find((station) => station.id === id);
    setStationName(match?.name ?? null);

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
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <Image
        src="/logo.png"
        alt="MK Live Radio Logo"
        width={128}
        height={128}
        className="mb-6 h-32 w-32 rounded-2xl shadow-lg"
      />
      <h1 className="mb-8 text-3xl font-bold">MK Live Radio</h1>

      {stationName && (
        <p className="mb-6 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur">
          Слушај {stationName}
        </p>
      )}

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
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

      <Link
        href="/webplayer"
        className="group mt-5 inline-flex items-center gap-2 rounded-full border border-[#c63a2e]/45 bg-gradient-to-r from-[#c63a2e]/26 via-[#d14a3f]/22 to-[#8f2018]/24 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(198,58,46,0.28)] transition duration-300 hover:scale-[1.03] hover:border-[#e26156]/75 hover:shadow-[0_0_38px_rgba(198,58,46,0.48)]"
      >
        <span className="h-2 w-2 rounded-full bg-[#e26156] transition group-hover:bg-[#ff8478]" />
        Слушај без апликација
      </Link>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
      </footer>
    </main>
  );
}
