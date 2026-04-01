import type { Metadata } from "next";
import StationDeepLinkClient from "./StationDeepLinkClient";

export const metadata: Metadata = {
  title: "Open In App",
  description:
    "Open a selected MK Live Radio station directly in the mobile app or continue in the web player.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "/webplayer",
  },
};

export default function StationPage() {
  return <StationDeepLinkClient />;
}
