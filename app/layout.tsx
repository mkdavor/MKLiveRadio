import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  absoluteUrl,
  APP_STORE_URL,
  DEFAULT_OG_IMAGE,
  INSTAGRAM_URL,
  PLAY_STORE_URL,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "MK Live Radio | Macedonian & Balkan Radio Stations Live",
    template: "%s | MK Live Radio",
  },
  description:
    "Listen to Macedonian and Balkan radio stations live for free. Stream 75+ online stations from North Macedonia on web, iOS, and Android.",
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  category: "music",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "mk_MK",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "MK Live Radio | Macedonian & Balkan Radio Stations Live",
    description:
      "Stream Macedonian radio stations live and free. Discover local FM, Balkan hits, folk, pop, and talk radio in one app.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "MK Live Radio - Macedonian radio stations live",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Live Radio | Macedonian & Balkan Radio Stations Live",
    description:
      "Listen to Macedonian radios online with the MK Live Radio mobile app and web player.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  other: {
    "google-adsense-account": "ca-pub-3134423958482288",
    "apple-itunes-app": "app-id=6748603781, app-argument=mkliveradio://",
    "google-play-app": "app-id=app.mkliveradio.android",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    sameAs: [INSTAGRAM_URL, APP_STORE_URL, PLAY_STORE_URL],
  };

  return (
    <html lang="mk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
