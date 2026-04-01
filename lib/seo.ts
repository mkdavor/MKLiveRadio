export const SITE_NAME = "MK Live Radio";
export const SITE_URL = "https://mkliveradio.app";
export const DEFAULT_OG_IMAGE = "/og.png";
export const INSTAGRAM_URL = "https://www.instagram.com/mkliveradio";
export const APP_STORE_URL = "https://apps.apple.com/de/app/mk-live-radio/id6748603781";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=app.mkliveradio.android";

export const SEO_KEYWORDS = [
  "Macedonian radio",
  "Macedonian radios",
  "Macedonian radio stations",
  "Balkan radio",
  "Balkan radios",
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
