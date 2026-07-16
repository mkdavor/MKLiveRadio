"use client";

import { SiteFooter, SiteHeader } from "@/app/components/site-chrome";

type Lang = "mk" | "en";

export default function PrivacyPolicyClient({ lang }: { lang: Lang }) {
  return (
    <main className="site-page">
      <SiteHeader language={lang} />
      <section className="site-shell legal-page">
        <div className="legal-content">{lang === "mk" ? <ContentMK /> : <ContentEN />}</div>
      </section>
      <SiteFooter language={lang} />
    </main>
  );
}

function ContentEN() {
  return (
    <>
      <span className="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p className="legal-date">
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

      <h2 className="mb-2 mt-10 text-2xl font-semibold">3. Analytics</h2>
      <p>
        The web version uses <strong>Firebase Analytics (Google Analytics 4)</strong> to collect
        aggregate usage data in the web player. We only track which station is played (station id
        and station name) and listening duration (seconds) to improve app quality and reliability.
      </p>
      <p className="mt-3">
        MK Live Radio does not require account registration, and does not collect direct personal
        identifiers such as name, phone number, or email address for analytics.
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">4. Contact</h2>
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
      <span className="eyebrow">Правни информации</span>
      <h1>Политика за приватност</h1>
      <p className="legal-date">
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

      <h2 className="mb-2 mt-10 text-2xl font-semibold">3. Аналитика</h2>
      <p>
        Веб верзијата користи <strong>Firebase Analytics (Google Analytics 4)</strong> за
        агрегирани статистики во web player. Се следи само која станица е пуштена (id и име на
        станица) и времетраење на слушање (во секунди) за подобрување на квалитетот и стабилноста.
      </p>
      <p className="mt-3">
        MK Live Radio не бара регистрација и не собира директни лични идентификатори како име,
        телефон или е-пошта за аналитика.
      </p>

      <h2 className="mb-2 mt-10 text-2xl font-semibold">4. Контакт</h2>
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
