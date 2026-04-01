import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MK Live Radio",
  metadataBase: new URL("https://mkliveradio.app"),
  description:
    "Слушај ги твоите омилени македонски радио станици – во живо, бесплатно и секогаш достапно.",
  openGraph: {
    title: "MK Live Radio",
    description:
      "Слушај ги твоите омилени македонски радио станици – во живо, бесплатно и секогаш достапно.",
    images: [{ url: "/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-3134423958482288"
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
