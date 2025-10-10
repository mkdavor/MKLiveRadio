import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import appstore from "../assets/appstore.svg";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      <img
        src={logo}
        alt="MK Live Radio Logo"
        className="rounded-2xl mb-6 w-32 h-32 shadow-lg"
      />
      <h1 className="text-4xl font-bold mb-2">MK Live Radio</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        Слушај ги твоите омилени македонски радио станици – во живо, бесплатно и
        секогаш достапно.
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
      <Analytics />
      <SpeedInsights />
    </main>
  );
};

export default Home;
