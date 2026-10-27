export const SITE_NAME = "MK Live Radio";
export const SITE_URL = "https://mkliveradio.app";
export const DEFAULT_OG_IMAGE = "/og.png";
export const INSTAGRAM_URL = "https://www.instagram.com/mkliveradio";
export const APP_STORE_ID = "6748603781";
// No country segment, so Apple opens each visitor's own storefront
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.mkliveradio.android";

/** Meta tags every page needs. Pages that set their own `other` metadata must spread this, since Next.js replaces `other` instead of merging it. */
export const BASE_OTHER_METADATA = {
  "google-adsense-account": "ca-pub-3134423958482288",
  "apple-itunes-app": `app-id=${APP_STORE_ID}`,
  "mobile-web-app-capable": "yes",
};

export const SEO_KEYWORDS = [
  "Macedonian radio",
  "Macedonian radios",
  "Macedonian radio stations",
  "radio Macedonia",
  "македонски радија",
  "македонско радио",
  "радио во живо",
  "mk live radio",
  "mkliveradio",
  "online radio Macedonia",
  "free radio app",
  "radio app iOS",
  "radio app Android",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
