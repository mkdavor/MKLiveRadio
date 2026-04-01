"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Lang = "mk" | "en";

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Lang>("mk");

  return (
    <main className="flex min-h-screen flex-col justify-between bg-black text-white">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-start gap-4 px-6 py-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="MK Live Radio"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl shadow"
          />
          <span className="hidden text-lg font-semibold sm:block">MK Live Radio</span>
        </Link>

        <div className="flex flex-row items-end gap-2">
          <button
            onClick={() => setLang("mk")}
            aria-label="Switch to Macedonian"
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
              lang === "mk" ? "bg-white text-black" : "border-gray-600 text-white"
            }`}
          >
            <Image src="https://flagcdn.com/w40/mk.png" alt="MK" width={16} height={12} />
            MK
          </button>
          <button
            onClick={() => setLang("en")}
            aria-label="Switch to English"
            className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
              lang === "en" ? "bg-white text-black" : "border-gray-600 text-white"
            }`}
          >
            <Image src="https://flagcdn.com/w40/gb.png" alt="EN" width={16} height={12} />
            EN
          </button>
        </div>
      </header>

      <section className="mx-auto w-full max-w-4xl space-y-4 px-6 pb-10">
        {lang === "mk" ? <ContentMK /> : <ContentEN />}
      </section>

      <footer className="pb-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
      </footer>
    </main>
  );
}

function ContentEN() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-gray-400">
        Effective Date: <strong>29.09.2025</strong>
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">1. Information Collection and Use</h2>
      <p>
        MK Live Radio does <strong>not collect, store, or share personal data</strong>. The app
        works without accounts or login.
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">2. Radio Streams</h2>
      <p>
        The app only links to <strong>public Macedonian radio streams</strong> available online.
      </p>
      <ul className="mb-4 mt-2 list-inside list-disc space-y-1 text-gray-300">
        <li>No login or geoblock</li>
        <li>No hosting or modification of the streams</li>
        <li>No monetization of the streams</li>
      </ul>

      <p>
        MK Live Radio does not own any of the radio stations, their content, or their logos.
      </p>
      <p className="mt-3">
        All trademarks, logos, and names are the property of their respective owners and are used
        for identification purposes only.
      </p>
      <p className="mt-3">
        MK Live Radio is not affiliated with, endorsed by, or officially connected to any radio
        station.
      </p>
      <p className="mt-3">Each station includes a link to its official website.</p>
      <p className="mt-3">
        Streaming content is provided by third-party sources and is publicly available.
      </p>
      <p className="mt-3">
        If you are a rights holder and would like any content to be removed or modified, please
        contact us and we will address your request promptly.
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">3. Contact</h2>
      <p>
        For questions or station removal requests, please write to{" "}
        <a
          href="mailto:contact@mkliveradio.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline transition hover:text-blue-300"
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
      <h1 className="mb-4 text-4xl font-bold">Политика за приватност</h1>
      <p className="mb-8 text-gray-400">
        Стапува во сила: <strong>29.09.2025</strong>
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">1. Собирање и користење на податоци</h2>
      <p>
        MK Live Radio <strong>не собира, не чува и не споделува лични податоци</strong>.
        Апликацијата функционира без сметка и без најава.
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">2. Радио стримови</h2>
      <p>
        Апликацијата поврзува <strong>јавно достапни македонски радио стримови</strong>.
      </p>
      <ul className="mb-4 mt-2 list-inside list-disc space-y-1 text-gray-300">
        <li>Без барање за најава</li>
        <li>Без гео-ограничувања</li>
        <li>Без хостирање или модификација</li>
      </ul>

      <p>
        MK Live Radio нема сопственост врз радио станиците, нивната содржина или нивните логоа.
      </p>
      <p className="mt-3">
        Сите трговски марки, логоа и имиња се сопственост на нивните соодветни сопственици и се
        користат исклучиво за идентификациски цели.
      </p>
      <p className="mt-3">
        MK Live Radio не е поврзан, поддржан или официјално одобрен од ниту една радио станица.
      </p>
      <p className="mt-3">Секоја радио станица содржи линк до нејзината официјална веб-страница.</p>
      <p className="mt-3">
        Стриминг содржината е обезбедена од трети страни и е јавно достапна.
      </p>
      <p className="mt-3">
        Доколку сте сопственик на содржина или права и сакате отстранување или измена на било кој
        дел, ве молиме контактирајте нѐ и истото ќе биде обработено во најкус можен рок.
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">3. Контакт</h2>
      <p>
        За прашања или барања за отстранување на станица, пишете на{" "}
        <a
          href="mailto:contact@mkliveradio.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline transition hover:text-blue-300"
        >
          contact@mkliveradio.app
        </a>
        .
      </p>
    </>
  );
}
