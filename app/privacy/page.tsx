import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";
import { absoluteUrl, SEO_KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the MK Live Radio privacy policy, data handling details, and station rights information for the mobile and web radio platform.",
  keywords: [...SEO_KEYWORDS, "privacy policy", "radio app privacy", "MK Live Radio privacy"],
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "article",
    url: absoluteUrl("/privacy"),
    title: "MK Live Radio Privacy Policy",
    description:
      "Privacy, streaming source, and rights information for MK Live Radio and its Macedonian radio station directory.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
