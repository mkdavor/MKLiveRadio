import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import logo from "../assets/logo.png";
import appstore from "../assets/appstore.svg";

const APP_STORE_URL =
  "https://apps.apple.com/de/app/mk-live-radio/id6748603781";

const Station = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "0";
    const appUrl = `mkliveradio://station?id=${id}`;

    let appOpened = false;
    const handleHide = () => (appOpened = true);
    document.addEventListener("visibilitychange", handleHide);

    // Try opening the app
    window.location.href = appUrl;

    // If it doesn’t open → show countdown
    const timer = setTimeout(() => {
      if (!appOpened) setShowCountdown(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleHide);
    };
  }, []);

  useEffect(() => {
    if (!showCountdown || canceled) return;

    if (seconds === 0) {
      window.location.href = APP_STORE_URL;
      return;
    }

    const countdown = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(countdown);
  }, [showCountdown, seconds, canceled]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      {/* Logo and title */}
      <img
        src={logo}
        alt="MK Live Radio Logo"
        className="rounded-2xl mb-6 w-32 h-32 shadow-lg"
      />
      <h1 className="text-3xl font-bold mb-2">MK Live Radio</h1>

      {/* Content */}
      {!showCountdown ? (
        <p className="text-gray-400 mb-6">
          Отвори ја апликацијата и слушај ја најдобрата македонска музика 🎶
        </p>
      ) : (
        <>
          <p className="text-red-400 font-medium mb-2">
            Изгледа ја немаш апликацијата
          </p>
          <p className="text-gray-300 mb-4">
            Пренасочување кон App Store за{" "}
            <span className="font-bold text-white">{seconds}</span> сек...
          </p>
          <button
            onClick={() => setCanceled(true)}
            className="border border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:border-red-500 hover:text-red-400 transition"
          >
            Откажи
          </button>
        </>
      )}

      {/* App Store button */}
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener"
        className="mt-8 inline-block"
      >
        <img
          src={appstore}
          alt="Download on the App Store"
          className="h-14 hover:scale-105 transition"
        />
      </a>

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
