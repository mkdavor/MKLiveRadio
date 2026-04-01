import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent,
  setConsent,
  type Analytics,
  type AnalyticsCallOptions,
  type EventParams,
} from "firebase/analytics";

export const FIREBASE_WEB_CONFIG = {
  apiKey: "AIzaSyBFZOHqcBuFtgrEkJMPUfaHQmeIygstxYo",
  authDomain: "mkliveradio.firebaseapp.com",
  projectId: "mkliveradio",
  storageBucket: "mkliveradio.firebasestorage.app",
  messagingSenderId: "609839373790",
  appId: "1:609839373790:web:c742f8f0354d9347a7114f",
  measurementId: "G-YVLCZDB7BM",
};

const ANALYTICS_CONSENT_KEY = "mk_analytics_consent";

export type ListenSessionReason =
  | "unknown"
  | "stopButton"
  | "stationSwitch"
  | "error"
  | "sleepTimer"
  | "appClose"
  | "osInterruption";

let analyticsPromise: Promise<Analytics | null> | null = null;

function readConsentValue() {
  if (typeof window === "undefined") {
    return "denied";
  }

  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted"
    ? "granted"
    : "denied";
}

export function hasAnalyticsConsent() {
  return readConsentValue() === "granted";
}

function getFirebaseApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(FIREBASE_WEB_CONFIG);
}

async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (!FIREBASE_WEB_CONFIG.measurementId) {
    return null;
  }

  const supported = await isSupported().catch(() => false);
  if (!supported) {
    return null;
  }

  return getAnalytics(getFirebaseApp());
}

async function getAnalyticsIfConsented(): Promise<Analytics | null> {
  if (!hasAnalyticsConsent()) {
    return null;
  }

  analyticsPromise ??= getFirebaseAnalytics().then((analytics) => {
    if (analytics) {
      setConsent({
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    return analytics;
  });

  return analyticsPromise;
}

export function grantAnalyticsConsent() {
  if (typeof window === "undefined") {
    return Promise.resolve<Analytics | null>(null);
  }

  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
  return getAnalyticsIfConsented();
}

export function trackEvent(
  eventName: string,
  params: EventParams = {},
  options?: AnalyticsCallOptions,
) {
  void getAnalyticsIfConsented().then((analytics) => {
    if (!analytics) {
      return;
    }

    logEvent(analytics, eventName, params, options);
  });
}

export function trackListenSession({
  stationId,
  stationName,
  listenSeconds,
  reason: _reason,
  recovered: _recovered,
}: {
  stationId: number;
  stationName: string;
  listenSeconds: number;
  reason: ListenSessionReason;
  recovered?: boolean;
}) {
  void _reason;
  void _recovered;

  trackEvent("listen_session", {
    station_id: stationId,
    station_name: stationName,
    listen_seconds: listenSeconds,
  });
}
