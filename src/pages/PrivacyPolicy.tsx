import { useState } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import logo from "../assets/logo.png";

type Lang = "mk" | "en";

export default function PrivacyPolicy() {
  const [lang, setLang] = useState<Lang>("mk");

  const Switch = () => (
    <div className="flex flex-row items-end gap-2">
      <button
        onClick={() => setLang("mk")}
        aria-label="Switch to Macedonian"
        className={`px-3 py-1 rounded-full border text-sm transition ${
          lang === "mk" ? "bg-white text-black" : "border-gray-600 text-white"
        }`}
      >
        🇲🇰 MK
      </button>
      <button
        onClick={() => setLang("en")}
        aria-label="Switch to English"
        className={`px-3 py-1 rounded-full border text-sm transition ${
          lang === "en" ? "bg-white text-black" : "border-gray-600 text-white"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between">
      <header className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-col items-start gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <img
            src={logo}
            alt="MK Live Radio"
            className="w-10 h-10 rounded-xl shadow"
          />
          <span className="text-lg font-semibold hidden sm:block">
            MK Live Radio
          </span>
        </Link>

        <div className="w-full">
          <Switch />
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pb-10 prose-invert prose-headings:mt-2 prose-p:mt-2">
        {lang === "mk" ? <ContentMK /> : <ContentEN />}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pb-6">
        © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
      </footer>

      {/* Keep analytics at the bottom like Home */}
      <Analytics />
      <SpeedInsights />
    </main>
  );
}

function ContentEN() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-400 mb-8">
        Effective Date: <strong>29.09.2025</strong>
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        1. Information Collection and Use
      </h2>
      <p>
        MK Live Radio does{" "}
        <strong>not collect, store, or share personal data</strong>. The app
        works without accounts or login.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">2. Radio Streams</h2>
      <p>
        The app only links to <strong>public Macedonian radio streams</strong>{" "}
        available online.
      </p>
      <ul className="list-disc list-inside space-y-1 mt-2 mb-4 text-gray-300">
        <li>No login or geoblock</li>
        <li>No hosting or modification of the streams</li>
        <li>No monetization of the streams</li>
      </ul>

      <p>
        MK Live Radio does not own any of the radio stations or their content.
        Station owners may request removal at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">3. Contact</h2>
      <p>
        For questions or station removal requests, please write to{" "}
        <a
          href="mailto:contact@mkliveradio.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          contact@mkliveradio.app
        </a>
        .
      </p>
    </>
  );
}

function ContentMK() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Политика за приватност</h1>
      <p className="text-gray-400 mb-8">
        Стапува во сила: <strong>29.09.2025</strong>
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">
        1. Собирање и користење на податоци
      </h2>
      <p>
        MK Live Radio{" "}
        <strong>не собира, не чува и не споделува лични податоци</strong>.
        Апликацијата функционира без сметка и без најава.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">2. Радио стримови</h2>
      <p>
        Апликацијата поврзува{" "}
        <strong>јавно достапни македонски радио стримови</strong>.
      </p>
      <ul className="list-disc list-inside space-y-1 mt-2 mb-4 text-gray-300">
        <li>Без барање за најава</li>
        <li>Без гео-ограничувања</li>
        <li>Без хостирање или модификација</li>
      </ul>

      <p>
        MK Live Radio не поседува сопственост врз радио станиците или нивната
        содржина. Сопствениците на станици може да побараат отстранување во
        секое време.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">3. Контакт</h2>
      <p>
        За прашања или барања за отстранување на станица, пишете на{" "}
        <a
          href="mailto:contact@mkliveradio.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          contact@mkliveradio.app
        </a>
        .
      </p>
    </>
  );
}
