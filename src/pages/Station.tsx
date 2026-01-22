import { useEffect, useMemo } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import logo from "../assets/logo.png";
import appstore from "../assets/appstore.svg";
import playstore from "../assets/playstore.svg";
import stations from "../stations.json";

const APP_STORE_URL =
  "https://apps.apple.com/de/app/mk-live-radio/id6748603781";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.mkliveradio.android";

const Station = () => {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  const id = idParam ? Number(idParam) : null;

  const stationName = useMemo(() => {
    if (id === null || Number.isNaN(id)) return null;
    const match = (stations as { id: number; name: string }[]).find(
      (s) => s.id === id,
    );
    return match?.name || null;
  }, [id]);

  const { isApple, isAndroid } = useMemo(() => {
    const ua = navigator.userAgent || "";
    const iosLike = /iPhone|iPad|iPod/i.test(ua);
    // iPadOS 13+ reports Mac platform with touch points
    const iPadOS =
      /Macintosh|Mac OS X/i.test(ua) && navigator.maxTouchPoints > 1;
    const macOS = /Macintosh|Mac OS X/i.test(ua);
    const apple = iosLike || iPadOS || macOS;
    return {
      isApple: apple,
      isAndroid: /Android/i.test(ua),
    };
  }, []);

  useEffect(() => {
    if (isApple) {
      const iosDeepLink = `mkliveradio://station?id=${id}`;
      // Try to open the iOS app; no store fallback
      window.location.href = iosDeepLink;
      return;
    }

    if (isAndroid) {
      // Try to open the Android app via intent; no Play Store fallback
      const androidIntent = `intent://station?id=${id}#Intent;scheme=mkliveradio;package=app.mkliveradio.android;end`;
      window.location.href = androidIntent;
    }
    // Non Apple/Android: no redirect
  }, [id, isApple, isAndroid]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      {/* Logo and title */}
      <img
        src={logo}
        alt="MK Live Radio Logo"
        className="rounded-2xl mb-6 w-32 h-32 shadow-lg"
      />
      <h1 className="text-3xl font-bold mb-8">MK Live Radio</h1>

      {stationName && (
        <p className="mb-6 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-lg font-semibold text-white shadow-lg backdrop-blur">
          Слушај {stationName}
        </p>
      )}

      {/* No text or buttons; auto-redirect handled on mount */}

      {/* Store badges always visible */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <a href={APP_STORE_URL} target="_blank" rel="noopener">
          <img
            src={appstore}
            alt="Download on the App Store"
            className="h-14 hover:scale-105 transition"
          />
        </a>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener">
          <img
            src={playstore}
            alt="Get it on Google Play"
            className="h-14 hover:scale-105 transition"
          />
        </a>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
      </footer>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </main>
  );
};

export default Station;
