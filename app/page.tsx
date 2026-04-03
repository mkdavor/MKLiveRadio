import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  INSTAGRAM_URL,
  PLAY_STORE_URL,
  SEO_KEYWORDS,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "MK Live Radio",
  description:
    "Listen to Macedonian radio stations live for free on web, iOS, and Android.",
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "MK Live Radio | Macedonian Radio Stations Live",
    description:
      "Stream Macedonian radio stations live and free. Available on web, iOS, and Android.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "MK Live Radio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Live Radio",
    description: "Macedonian radio stations live.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MK Live Radio",
    url: SITE_URL,
    inLanguage: ["mk", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/stations?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const mobileAppSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        name: "MK Live Radio iOS",
        operatingSystem: "iOS",
        applicationCategory: "MusicApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: APP_STORE_URL,
      },
      {
        "@type": "MobileApplication",
        name: "MK Live Radio Android",
        operatingSystem: "Android",
        applicationCategory: "MusicApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: PLAY_STORE_URL,
      },
    ],
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
      />
      <div className="absolute right-4 top-4">
        <Link
          href="/privacy"
          className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <span className="flex items-center gap-1" aria-hidden>
            <Image src="https://flagcdn.com/w40/mk.png" alt="MK" width={16} height={12} />
            <Image src="https://flagcdn.com/w40/gb.png" alt="EN" width={16} height={12} />
          </span>
          <span>Политика за приватност</span>
        </Link>
      </div>

      <Image
        src="/logo.png"
        alt="MK Live Radio Logo"
        width={128}
        height={128}
        className="mb-6 h-32 w-32 rounded-2xl shadow-lg"
      />
      <h1 className="mb-2 text-4xl font-bold">MK Live Radio</h1>
      <p className="mb-6 max-w-md text-gray-400">
        Слушај ги твоите омилени македонски радио станици – во живо, бесплатно и
        секогаш достапно.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/appstore.svg"
            alt="Download on the App Store"
            width={168}
            height={56}
            className="h-14 w-auto transition hover:scale-105"
          />
        </a>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
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

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center gap-2 text-gray-400 transition hover:text-white"
      >
        <Image
          src="/instaLogo.png"
          alt="Instagram"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span>@mkliveradio</span>
      </a>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MK Live Radio · Made with ❤️ in Macedonia
      </footer>
    </main>
  );
}
