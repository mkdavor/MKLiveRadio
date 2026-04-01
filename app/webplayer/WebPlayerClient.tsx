"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FiCheckCircle, FiGlobe, FiPause, FiPlay, FiShare2, FiXCircle } from "react-icons/fi";
import { resolveStationStream } from "../../lib/resolve-station-stream";
import { pickStationLogoName, stations } from "@/lib/stations";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/seo";
import {
  grantAnalyticsConsent,
  hasAnalyticsConsent,
  trackListenSession,
  type ListenSessionReason,
} from "@/lib/analytics";
import styles from "./webplayer.module.css";

type Locale = "mk" | "en";
type StatusKey =
  | "ready"
  | "live"
  | "paused"
  | "connecting"
  | "streamUnavailable"
  | "resolving"
  | "selected"
  | "pressPlay"
  | "starting"
  | "autoplayBlocked"
  | "noWebsite"
  | "shareOpened"
  | "shareCopied"
  | "shareFailed";

const copy = {
  mk: {
    stations: "Станици",
    cityLabel: "Град",
    allCities: "Сите",
    searchPlaceholder: "Пребарај станица...",
    noResults: "Нема резултати",
    liveRadio: "ВО ЖИВО",
    liveFallback: "Во живо",
    mute: "Исклучи",
    unmute: "Вклучи",
    openWebsite: "Отвори веб-страница",
    shareStation: "Сподели станица",
    play: "Пушти во живо",
    pause: "Пауза",
    status: {
      ready: "Подготвено за слушање во живо",
      live: "Во живо",
      paused: "Паузирано",
      connecting: "Се поврзува...",
      streamUnavailable: "Стримот моментално не е достапен",
      resolving: "Се вчитува URL за стрим...",
      selected: "Избрано: ",
      pressPlay: "Притисни Play за старт",
      starting: "Се стартува стрим...",
      autoplayBlocked: "Прелистувачот блокира autoplay. Притисни Play повторно.",
      noWebsite: "Нема веб-страница за оваа станица",
      shareOpened: "Отворен е прозорецот за споделување",
      shareCopied: "Линкот е копиран",
      shareFailed: "Неуспешно автоматско споделување",
    },
  },
  en: {
    stations: "Stations",
    cityLabel: "City",
    allCities: "All",
    searchPlaceholder: "Search station...",
    noResults: "No results",
    liveRadio: "LIVE RADIO",
    liveFallback: "Live",
    mute: "Mute",
    unmute: "Unmute",
    openWebsite: "Open station website",
    shareStation: "Share station",
    play: "Play live stream",
    pause: "Pause live stream",
    status: {
      ready: "Ready for live playback",
      live: "Live now",
      paused: "Paused",
      connecting: "Connecting to stream...",
      streamUnavailable: "Stream unavailable right now",
      resolving: "Resolving stream URL...",
      selected: "Selected: ",
      pressPlay: "Press play to start selected station",
      starting: "Starting stream...",
      autoplayBlocked: "Browser blocked autoplay. Press play again.",
      noWebsite: "No website available for this station",
      shareOpened: "Share dialog opened",
      shareCopied: "Share link copied",
      shareFailed: "Unable to share automatically",
    },
  },
} as const;

const fallbackStation = stations.find((station) => station.id === 5) ?? stations[0];
const LISTEN_SESSION_CHECKPOINT_KEY = "listen_session_checkpoint";
const CHECKPOINT_INTERVAL_MS = 10_000;

type SessionCheckpoint = {
  stationId: number;
  stationName: string;
  listenSeconds: number;
  savedAt: number;
};

function readListenSessionCheckpoint(): SessionCheckpoint | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(LISTEN_SESSION_CHECKPOINT_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SessionCheckpoint>;
    if (
      typeof parsed.stationId !== "number" ||
      typeof parsed.stationName !== "string" ||
      typeof parsed.listenSeconds !== "number" ||
      parsed.listenSeconds <= 0
    ) {
      return null;
    }

    return {
      stationId: parsed.stationId,
      stationName: parsed.stationName,
      listenSeconds: Math.ceil(parsed.listenSeconds),
      savedAt: typeof parsed.savedAt === "number" ? parsed.savedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export default function WebPlayerPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectedStationRef = useRef(fallbackStation);
  const sessionStartedAtRef = useRef<number | null>(null);
  const sessionStationRef = useRef<{ id: number; name: string } | null>(null);
  const checkpointTimerRef = useRef<number | null>(null);
  const analyticsConsentRef = useRef(false);
  const [locale, setLocale] = useState<Locale>("mk");
  const [selectedStationId, setSelectedStationId] = useState<number>(fallbackStation.id);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [statusKey, setStatusKey] = useState<StatusKey>("ready");
  const [logoFailed, setLogoFailed] = useState(false);
  const [autoplayFromQuery, setAutoplayFromQuery] = useState(false);
  const [resolvedStreamUrl, setResolvedStreamUrl] = useState<string>(fallbackStation.url);
  const [analyticsConsentGranted, setAnalyticsConsentGranted] = useState(false);

  const selectedStation = useMemo(
    () => stations.find((station) => station.id === selectedStationId) ?? fallbackStation,
    [selectedStationId],
  );

  const logoName = pickStationLogoName(selectedStation);
  const logoSrc = logoFailed ? "/logo.png" : `/logos/${logoName}.webp`;
  const t = copy[locale];
  const stationDisplayName =
    locale === "en" ? selectedStation.name_en ?? selectedStation.name : selectedStation.name;
  const stationDisplayCity = locale === "en" ? selectedStation.city_en ?? selectedStation.city : selectedStation.city;
  const statusText =
    statusKey === "selected" ? `${t.status.selected}${stationDisplayName}` : t.status[statusKey];
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  const clearListenSessionCheckpoint = useCallback(() => {
    window.localStorage.removeItem(LISTEN_SESSION_CHECKPOINT_KEY);
  }, []);

  const saveListenSessionCheckpoint = useCallback((listenSeconds: number) => {
    const station = sessionStationRef.current;
    if (!station) {
      return;
    }

    const checkpoint: SessionCheckpoint = {
      stationId: station.id,
      stationName: station.name,
      listenSeconds,
      savedAt: Date.now(),
    };

    window.localStorage.setItem(LISTEN_SESSION_CHECKPOINT_KEY, JSON.stringify(checkpoint));
  }, []);

  const stopCheckpointTimer = useCallback(() => {
    if (checkpointTimerRef.current !== null) {
      window.clearInterval(checkpointTimerRef.current);
      checkpointTimerRef.current = null;
    }
  }, []);

  const startCheckpointTimer = useCallback(() => {
    stopCheckpointTimer();

    checkpointTimerRef.current = window.setInterval(() => {
      const startedAt = sessionStartedAtRef.current;
      if (!startedAt) {
        return;
      }

      const listenSeconds = Math.max(1, Math.ceil((Date.now() - startedAt) / 1000));
      saveListenSessionCheckpoint(listenSeconds);
    }, CHECKPOINT_INTERVAL_MS);
  }, [saveListenSessionCheckpoint, stopCheckpointTimer]);

  const startListenSession = useCallback(() => {
    if (!analyticsConsentRef.current) {
      return;
    }

    if (sessionStartedAtRef.current) {
      return;
    }

    const station = selectedStationRef.current;
    sessionStartedAtRef.current = Date.now();
    sessionStationRef.current = { id: station.id, name: station.name };
    saveListenSessionCheckpoint(1);
    startCheckpointTimer();
  }, [saveListenSessionCheckpoint, startCheckpointTimer]);

  const resetListenSession = useCallback(() => {
    sessionStartedAtRef.current = null;
    sessionStationRef.current = null;
    stopCheckpointTimer();
  }, [stopCheckpointTimer]);

  const endListenSession = useCallback(
    (
      reason: ListenSessionReason,
      options: { sendEvent?: boolean; keepCheckpoint?: boolean } = {},
    ) => {
      if (!analyticsConsentRef.current) {
        resetListenSession();
        clearListenSessionCheckpoint();
        return;
      }

      const { sendEvent = true, keepCheckpoint = false } = options;
      const startedAt = sessionStartedAtRef.current;
      const station = sessionStationRef.current;

      if (!startedAt || !station) {
        return;
      }

      const listenSeconds = Math.max(1, Math.ceil((Date.now() - startedAt) / 1000));

      if (keepCheckpoint) {
        saveListenSessionCheckpoint(listenSeconds);
      } else {
        clearListenSessionCheckpoint();
      }

      if (sendEvent) {
        trackListenSession({
          stationId: station.id,
          stationName: station.name,
          listenSeconds,
          reason,
        });
      }

      resetListenSession();
    },
    [clearListenSessionCheckpoint, resetListenSession, saveListenSessionCheckpoint],
  );

  useEffect(() => {
    const consentGranted = hasAnalyticsConsent();
    analyticsConsentRef.current = consentGranted;
    setAnalyticsConsentGranted(consentGranted);

    if (consentGranted) {
      void grantAnalyticsConsent();
    }
  }, []);

  const cityOptions = useMemo(() => {
    const uniqueCities = new Set<string>();

    for (const station of stations) {
      const city = locale === "en" ? station.city_en ?? station.city : station.city;

      if (city && city.trim() !== "") {
        uniqueCities.add(city);
      }
    }

    return Array.from(uniqueCities).sort((a, b) => a.localeCompare(b, locale));
  }, [locale]);

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const displayCity = locale === "en" ? station.city_en ?? station.city : station.city;
      const cityMatches = cityFilter === "all" || displayCity === cityFilter;
      const queryMatches =
        normalizedQuery === "" ||
        station.name.toLocaleLowerCase().includes(normalizedQuery) ||
        (station.name_en ?? "").toLocaleLowerCase().includes(normalizedQuery) ||
        (station.city ?? "").toLocaleLowerCase().includes(normalizedQuery) ||
        (station.city_en ?? "").toLocaleLowerCase().includes(normalizedQuery);

      return cityMatches && queryMatches;
    });
  }, [cityFilter, locale, normalizedQuery]);

  useEffect(() => {
    if (cityFilter !== "all" && !cityOptions.includes(cityFilter)) {
      setCityFilter("all");
    }
  }, [cityFilter, cityOptions]);

  useEffect(() => {
    selectedStationRef.current = selectedStation;
  }, [selectedStation]);

  useEffect(() => {
    setLogoFailed(false);
  }, [selectedStationId]);

  useEffect(() => {
    const checkpoint = readListenSessionCheckpoint();
    clearListenSessionCheckpoint();

    if (!checkpoint) {
      return;
    }

    trackListenSession({
      stationId: checkpoint.stationId,
      stationName: checkpoint.stationName,
      listenSeconds: checkpoint.listenSeconds,
      reason: "appClose",
      recovered: true,
    });
  }, [clearListenSessionCheckpoint]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idValue = params.get("id");

    if (!idValue) {
      return;
    }

    const parsed = Number(idValue);

    if (Number.isNaN(parsed)) {
      return;
    }

    const exists = stations.some((station) => station.id === parsed);

    if (!exists) {
      return;
    }

    setSelectedStationId(parsed);
    setAutoplayFromQuery(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const onPlaying = () => {
      setIsPlaying(true);
      setIsConnecting(false);
      setStatusKey("live");
      startListenSession();
    };

    const onPause = () => {
      setIsPlaying(false);
      setIsConnecting(false);
      setStatusKey("paused");
    };

    const onWaiting = () => {
      setIsConnecting(true);
      setStatusKey("connecting");
    };

    const onCanPlay = () => {
      setIsConnecting(false);
      if (!audio.paused) {
        setStatusKey("live");
      }
    };

    const onError = () => {
      setIsPlaying(false);
      setIsConnecting(false);
      setStatusKey("streamUnavailable");
      endListenSession("error");
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, [endListenSession, startListenSession]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    let cancelled = false;

    const resolveUrl = async () => {
      if (selectedStation.shouldParseUrl) {
        setStatusKey("resolving");
      }

      const parsedUrl = await resolveStationStream(selectedStation);

      if (cancelled) {
        return;
      }

      setResolvedStreamUrl(parsedUrl);
    };

    void resolveUrl();

    return () => {
      cancelled = true;
    };
  }, [selectedStation]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const shouldResume = !audio.paused || autoplayFromQuery;
    audio.pause();
    audio.load();
    setIsPlaying(false);
    setIsConnecting(false);
    setStatusKey("selected");

    if (!shouldResume) {
      setAutoplayFromQuery(false);
      return;
    }

    void audio.play().catch(() => {
      setIsConnecting(false);
      setStatusKey("pressPlay");
    }).finally(() => {
      setAutoplayFromQuery(false);
    });
  }, [autoplayFromQuery, resolvedStreamUrl, selectedStation.id]);

  useEffect(() => {
    const persistSessionForAppClose = () => {
      endListenSession("appClose", { sendEvent: false, keepCheckpoint: true });
    };

    window.addEventListener("pagehide", persistSessionForAppClose);
    window.addEventListener("beforeunload", persistSessionForAppClose);

    return () => {
      window.removeEventListener("pagehide", persistSessionForAppClose);
      window.removeEventListener("beforeunload", persistSessionForAppClose);
      persistSessionForAppClose();
    };
  }, [endListenSession]);

  const handleStationSelect = (stationId: number) => {
    if (stationId === selectedStationRef.current.id) {
      return;
    }

    endListenSession("stationSwitch");
    setSelectedStationId(stationId);
  };

  const acceptAnalyticsConsent = () => {
    analyticsConsentRef.current = true;
    setAnalyticsConsentGranted(true);
    void grantAnalyticsConsent();

    const audio = audioRef.current;
    if (audio && !audio.paused) {
      startListenSession();
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        setIsConnecting(true);
        setStatusKey("starting");
        await audio.play();
      } catch {
        setIsConnecting(false);
        setStatusKey("autoplayBlocked");
      }
      return;
    }

    endListenSession("stopButton");
    audio.pause();
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const onVolumeChange = (nextValue: number) => {
    const audio = audioRef.current;

    setVolume(nextValue);

    if (!audio) {
      return;
    }

    audio.volume = nextValue;

    if (nextValue > 0 && audio.muted) {
      audio.muted = false;
      setIsMuted(false);
    }
  };

  const openWebsite = () => {
    if (!selectedStation.website) {
      setStatusKey("noWebsite");
      return;
    }

    window.open(selectedStation.website, "_blank", "noopener,noreferrer");
  };

  const shareStation = async () => {
    const shareUrl = `${window.location.origin}/webplayer?id=${selectedStation.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: stationDisplayName,
          url: shareUrl,
        });
        setStatusKey("shareOpened");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setStatusKey("shareCopied");
    } catch {
      setStatusKey("shareFailed");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.bgOrbA} aria-hidden />
      <div className={styles.bgOrbB} aria-hidden />
      <div className={styles.languageSwitch}>
        <button
          type="button"
          className={`${styles.langButton} ${locale === "mk" ? styles.langButtonActive : ""}`}
          onClick={() => setLocale("mk")}
          aria-label="Македонски"
          title="Македонски"
        >
          <Image src="https://flagcdn.com/w40/mk.png" alt="MK flag" width={24} height={16} />
        </button>
        <button
          type="button"
          className={`${styles.langButton} ${locale === "en" ? styles.langButtonActive : ""}`}
          onClick={() => setLocale("en")}
          aria-label="English"
          title="English"
        >
          <Image src="https://flagcdn.com/w40/gb.png" alt="EN flag" width={24} height={16} />
        </button>
      </div>

      <div className={styles.layout}>
        <aside className={styles.stationPanel}>
          <p className={styles.stationLabel}>{t.stations}</p>
          <div className={styles.filterControls}>
            <label className={styles.filterLabel} htmlFor="cityFilter">
              {t.cityLabel}
            </label>
            <select
              id="cityFilter"
              className={styles.citySelect}
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
            >
              <option value="all">{t.allCities}</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className={styles.searchInput}
              aria-label={t.searchPlaceholder}
            />
          </div>
          <div className={styles.stationList}>
            {filteredStations.map((station) => {
              const isActive = station.id === selectedStation.id;
              const stationLogo = `/logos/${pickStationLogoName(station)}.webp`;
              const stationName = locale === "en" ? station.name_en ?? station.name : station.name;
              const stationCity = locale === "en" ? station.city_en ?? station.city : station.city;

              return (
                <button
                  key={station.id}
                  type="button"
                  className={`${styles.stationItem} ${isActive ? styles.stationItemActive : ""}`}
                  onClick={() => handleStationSelect(station.id)}
                >
                  <Image
                    src={stationLogo}
                    alt={`${stationName} logo`}
                    className={styles.stationThumb}
                    width={42}
                    height={42}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/logo.png";
                    }}
                  />
                  <span className={styles.stationText}>
                    <span className={styles.stationName}>{stationName}</span>
                    <span className={styles.stationCity}>{stationCity ?? ""}</span>
                  </span>
                </button>
              );
            })}
            {filteredStations.length === 0 && <p className={styles.noResults}>{t.noResults}</p>}
          </div>
        </aside>

        <div className={styles.playerColumn}>
          <section className={styles.playerCard}>
            <div className={styles.logoSquare}>
              <Image
                src={logoSrc}
                alt={`${stationDisplayName} logo`}
                width={280}
                height={280}
                className={styles.logoImage}
                priority
                onError={() => setLogoFailed(true)}
              />
            </div>

            <p className={`${styles.livePill} ${isPlaying ? styles.livePillOn : ""}`}>
              <span className={styles.liveDot} /> {t.liveRadio}
            </p>

            <h1 className={styles.title}>{stationDisplayName}</h1>
            <p className={styles.subtitle}>{stationDisplayCity ?? t.liveFallback}</p>

            <div className={`${styles.equalizer} ${isPlaying ? styles.equalizerOn : ""}`} aria-hidden>
              {Array.from({ length: 18 }).map((_, index) => (
                <span
                  key={index}
                  className={styles.bar}
                  style={{ animationDelay: `${index * 0.06}s` }}
                />
              ))}
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={openWebsite}
                aria-label={t.openWebsite}
                title={t.openWebsite}
              >
                <FiGlobe className={styles.actionIcon} />
              </button>

              <button
                type="button"
                className={styles.playButton}
                onClick={togglePlayback}
                aria-label={isPlaying ? t.pause : t.play}
                title={isPlaying ? t.pause : t.play}
              >
                {isConnecting ? (
                  <span className={styles.playSpinner} aria-hidden />
                ) : isPlaying ? (
                  <FiPause className={styles.playIcon} />
                ) : (
                  <FiPlay className={styles.playIcon} />
                )}
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={shareStation}
                aria-label={t.shareStation}
                title={t.shareStation}
              >
                <FiShare2 className={styles.actionIcon} />
              </button>
            </div>

            <div className={styles.volumeRow}>
              <button type="button" className={styles.muteButton} onClick={toggleMute}>
                {isMuted || volume === 0 ? t.unmute : t.mute}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => onVolumeChange(Number(event.target.value))}
                className={styles.volumeSlider}
                aria-label="Volume"
              />
            </div>

            <p className={styles.status}>{statusText}</p>
          </section>

          <div className={styles.downloadBadges}>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.storeBadgeLink}>
              <Image
                src="/appstore.svg"
                alt="Download on the App Store"
                width={168}
                height={56}
                className={styles.storeBadge}
              />
            </a>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={styles.storeBadgeLink}>
              <Image
                src="/playstore.svg"
                alt="Get it on Google Play"
                width={189}
                height={56}
                className={styles.storeBadge}
              />
            </a>
          </div>
        </div>
      </div>

      {!analyticsConsentGranted && (
        <div className={styles.consentOverlay} role="dialog" aria-modal="true" aria-label="Analytics consent">
          <div className={styles.consentModal}>
            <p className={styles.consentTitle}>
              {locale === "mk" ? "Согласност за аналитика" : "Analytics Consent"}
            </p>
            <p className={styles.consentBody}>
              {locale === "mk"
                ? "Со користење на оваа апликација се согласувате со аналитика за подобрување на квалитетот."
                : "By using this app, you consent to analytics used to improve quality."}
            </p>
            <ul className={styles.consentList}>
              <li className={styles.consentItem}>
                <FiCheckCircle className={`${styles.consentIcon} ${styles.consentIconYes}`} />
                <span>
                  {locale === "mk" ? "Се собира: која станица е пуштена" : "Collected: which station is played"}
                </span>
              </li>
              <li className={styles.consentItem}>
                <FiCheckCircle className={`${styles.consentIcon} ${styles.consentIconYes}`} />
                <span>
                  {locale === "mk"
                    ? "Се собира: колку долго е слушана"
                    : "Collected: how long it is played"}
                </span>
              </li>
              <li className={styles.consentItem}>
                <FiXCircle className={`${styles.consentIcon} ${styles.consentIconNo}`} />
                <span>
                  {locale === "mk"
                    ? "Не се собираат лични податоци"
                    : "No personal data is collected"}
                </span>
              </li>
            </ul>
            <button type="button" className={styles.consentOkButton} onClick={acceptAnalyticsConsent}>
              OK
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} preload="none" playsInline>
        <source src={resolvedStreamUrl} type="audio/mpeg" />
      </audio>
    </main>
  );
}
