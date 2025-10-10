import { useEffect } from "react";
import logo from "../assets/logo.png";
import appstore from "../assets/appstore.svg";

const Station = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id") || "0";
      const appUrl = `mkliveradio://station?id=${id}`;

      // Open app via hidden iframe (safer for iOS)
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = appUrl;
      document.body.appendChild(iframe);
    }, 300); // wait for DOM to render first

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      <img
        src={logo}
        alt="MK Live Radio Logo"
        className="rounded-2xl mb-6 w-32 h-32 shadow-lg"
      />
      <h1 className="text-3xl font-bold mb-2">MK Live Radio</h1>
      <p className="text-gray-400 mb-6">
        Отвори ја апликацијата и слушај ја најдобрата македонска музика 🎶
      </p>
      <a
        href="https://apps.apple.com/de/app/mk-live-radio/id6748603781"
        target="_blank"
        rel="noopener"
      >
        <img
          src={appstore}
          alt="Download on the App Store"
          className="h-14 hover:scale-105 transition"
        />
      </a>
    </main>
  );
};

export default Station;
