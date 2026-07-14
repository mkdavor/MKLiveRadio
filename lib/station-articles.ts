import type { Station } from "@/lib/stations";
import {
  getStationDisplayCity,
  getStationDisplayName,
  getStationPath,
} from "@/lib/stations";

export type StationArticleLanguage = "en" | "mk";

type ResearchSeed = {
  titleEn?: string;
  titleMk?: string;
  descriptionEn?: string;
  descriptionMk?: string;
  keywords?: string[];
  highlightEn?: string;
  highlightMk?: string;
  frequency?: string;
  founded?: string;
  formatEn?: string;
  formatMk?: string;
};

const RESEARCH_SEEDS: Record<number, ResearchSeed> = {
  0: {
    titleEn: "Antenna 5 live",
    titleMk: "Антена 5 во живо",
    descriptionEn:
      "Listen to Antenna 5 live, one of Macedonia's best-known hit radio stations with a long-running FM and online presence.",
    descriptionMk:
      "Слушај Антена 5 во живо, една од најпознатите македонски хит радио станици со долгогодишно FM и онлајн присуство.",
    keywords: ["Antenna 5", "Antenna 5 live", "Антена 5", "Macedonian hit radio"],
    highlightEn:
      "Antenna 5 started in Skopje in 1994 and grew into a recognizable national radio brand for current hits and pop culture.",
    highlightMk:
      "Антена 5 почна во Скопје во 1994 година и со тек на време стана препознатливо национално радио за хитови и поп-култура.",
    frequency: "95.5 FM Skopje",
    founded: "1994",
    formatEn: "contemporary hit radio",
    formatMk: "современо хит радио",
  },
  5: {
    titleEn: "Jazz FM Skopje live",
    titleMk: "Jazz FM Скопје во живо",
    descriptionEn:
      "Listen to Jazz FM Skopje live on 100.8 FM and online, with jazz shows, groove selections, and related Jazz FM streams.",
    descriptionMk:
      "Слушај Jazz FM Скопје во живо на 100.8 FM и онлајн, со џез емисии, groove селекција и сродни Jazz FM стримови.",
    keywords: ["Jazz FM Skopje", "Jazz FM 100.8", "Macedonian jazz radio"],
    highlightEn:
      "Jazz FM keeps a clear jazz identity, with curated shows, presenters, and sister streams for listeners who want a focused music choice.",
    highlightMk:
      "Jazz FM има јасен џез идентитет, со авторски емисии, водители и сестрински стримови за слушатели што сакаат фокусирана музичка селекција.",
    frequency: "100.8 FM Skopje",
    formatEn: "jazz and groove programming",
    formatMk: "џез и groove програма",
  },
  10: {
    titleEn: "Radio Skopje MRT live",
    titleMk: "Радио Скопје MRT во живо",
    descriptionEn:
      "Listen to Radio Skopje live through MRT Play, with public-service programming, news, talk shows, and Macedonian radio content.",
    descriptionMk:
      "Слушај Радио Скопје во живо преку MRT Play, со јавносервисна програма, вести, говорни емисии и македонска радио содржина.",
    keywords: ["Radio Skopje", "MRT radio", "Macedonian public radio"],
    formatEn: "public service talk and information radio",
    formatMk: "јавен сервис со говорна и информативна програма",
  },
  20: {
    titleEn: "MRT Radio 2 live",
    titleMk: "MRT Радио 2 во живо",
    descriptionEn:
      "Listen to MRT Radio 2 live, the Macedonian public radio channel for popular music and entertainment on MRT Play.",
    descriptionMk:
      "Слушај MRT Радио 2 во живо, јавен радио канал со популарна музика и забавна програма преку MRT Play.",
    keywords: ["Radio 2 Macedonia", "MRT Radio 2", "Macedonian music radio"],
    formatEn: "popular music and entertainment",
    formatMk: "популарна музика и забава",
  },
  30: {
    titleEn: "MRT Radio 3 live",
    titleMk: "MRT Радио 3 во живо",
    descriptionEn:
      "Listen to MRT Radio 3 live, the multilingual public-service radio channel with programming for communities in North Macedonia.",
    descriptionMk:
      "Слушај MRT Радио 3 во живо, повеќејазичен јавен радио канал со програма на јазиците на заедниците во Македонија.",
    keywords: ["Radio 3 Macedonia", "minority language radio Macedonia", "MRT Play"],
    formatEn: "multilingual public-service radio",
    formatMk: "повеќејазичен јавен радио сервис",
  },
  40: {
    titleEn: "Radio SAT MRT live",
    titleMk: "Радио САТ MRT во живо",
    descriptionEn:
      "Listen to Radio SAT live on MRT Play, with Macedonian public radio programming available online.",
    descriptionMk:
      "Слушај Радио САТ во живо преку MRT Play, со македонска јавносервисна радио програма достапна онлајн.",
    keywords: ["Radio SAT", "MRT Radio SAT", "Macedonian radio live"],
  },
  50: {
    titleEn: "Kanal 77 live",
    titleMk: "Канал 77 во живо",
    descriptionEn:
      "Listen to Kanal 77 live, a long-running Macedonian private radio brand with music, news, podcasts, and FM coverage.",
    descriptionMk:
      "Слушај Канал 77 во живо, долгогодишен македонски приватен радио бренд со музика, вести, подкасти и FM покриеност.",
    keywords: ["Kanal 77", "Kanal 77 live", "Канал 77", "Macedonian radio news"],
    highlightEn:
      "Kanal 77 is known for its national radio identity, combining music with news, talk content, podcasts, and digital listening.",
    highlightMk:
      "Канал 77 е препознатлив по националниот радио формат, со комбинација од музика, вести, говорна програма, подкасти и онлајн слушање.",
    founded: "1991",
    frequency: "89.7 FM Skopje",
    formatEn: "music, talk, news, and podcasts",
    formatMk: "музика, говорна програма, вести и подкасти",
  },
  100: {
    titleEn: "Radio Bubamara 105.2 FM live",
    titleMk: "Радио Бубамара 105.2 FM во живо",
    descriptionEn:
      "Listen to Radio Bubamara live from Skopje on 105.2 FM and online, with Macedonian music and entertainment.",
    descriptionMk:
      "Слушај Радио Бубамара во живо од Скопје на 105.2 FM и онлајн, со македонска музика и забавна програма.",
    keywords: ["Radio Bubamara", "Bubamara 105.2", "Macedonian music radio"],
    founded: "April 1994",
    frequency: "105.2 FM Skopje",
    formatEn: "Macedonian music and entertainment",
    formatMk: "македонска музика и забава",
  },
  140: {
    titleEn: "Sky Radio 102.5 FM Skopje live",
    titleMk: "Sky Радио 102.5 FM Скопје во живо",
    descriptionEn:
      "Listen to Sky Radio Skopje live on 102.5 FM and online, with hits, retro music, and live radio channels.",
    descriptionMk:
      "Слушај Sky Радио Скопје во живо на 102.5 FM и онлајн, со хитови, ретро музика и live радио канали.",
    keywords: ["Sky Radio Skopje", "Sky Radio 102.5", "Skopje hits radio"],
    frequency: "102.5 FM Skopje",
    formatEn: "hits and retro radio",
    formatMk: "хитови и ретро радио",
  },
  170: {
    titleEn: "Radio Kavadarci 99.1 FM live",
    titleMk: "Радио Кавадарци 99.1 FM во живо",
    descriptionEn:
      "Listen to Radio Kavadarci live on 99.1 FM, a local family-oriented station with music and talk programming.",
    descriptionMk:
      "Слушај Радио Кавадарци во живо на 99.1 FM, локално семејно радио со музика и говорна програма.",
    keywords: ["Radio Kavadarci", "Kavadarci radio 99.1", "family radio Macedonia"],
    founded: "1958",
    frequency: "99.1 FM Kavadarci",
    formatEn: "local music-and-talk family radio",
    formatMk: "локално семејно радио со музика и говорна програма",
  },
  180: {
    titleEn: "Radio MEFF 98.7 FM live",
    titleMk: "Радио МЕФФ 98.7 FM во живо",
    descriptionEn:
      "Listen to Radio MEFF live from Prilep on 98.7 FM and online, with local radio programming from Pelagonia.",
    descriptionMk:
      "Слушај Радио МЕФФ во живо од Прилеп на 98.7 FM и онлајн, со локална радио програма од Пелагонија.",
    keywords: ["Radio MEFF", "Radio MEFF live", "Prilep 98.7 FM"],
    frequency: "98.7 FM Prilep",
  },
  190: {
    titleEn: "Play FM Struga live",
    titleMk: "Play FM Струга во живо",
    descriptionEn:
      "Listen to Play FM live from Struga, with pop, rock, dance, retro, lounge, and online music channels.",
    descriptionMk:
      "Слушај Play FM во живо од Струга, со pop, rock, dance, retro, lounge и други онлајн музички канали.",
    keywords: ["Play FM Struga", "Play FM live", "dance radio Macedonia"],
    frequency: "90.4 FM Struga",
    formatEn: "pop, rock, dance, retro, and lounge radio",
    formatMk: "pop, rock, dance, retro и lounge радио",
  },
  210: {
    titleEn: "Sportsko Radio 90.3 live",
    titleMk: "Спортско Радио 90.3 во живо",
    descriptionEn:
      "Listen to Sportsko Radio live on 90.3 FM, a Macedonian station focused on sports content and live radio.",
    descriptionMk:
      "Слушај Спортско Радио во живо на 90.3 FM, македонска радио станица фокусирана на спортска содржина.",
    keywords: ["Sportsko Radio", "sports radio Macedonia", "Skopje sports radio"],
    frequency: "90.3 FM Skopje",
    formatEn: "sports radio",
    formatMk: "спортско радио",
  },
  230: {
    titleEn: "Kanal 103 Skopje live",
    titleMk: "Канал 103 Скопје во живо",
    descriptionEn:
      "Listen to Kanal 103 live from Skopje on 103.0 FM, with alternative, avant-garde, and culture-focused music programming.",
    descriptionMk:
      "Слушај Канал 103 во живо од Скопје на 103.0 FM, со алтернативна, авангардна и културно-музичка програма.",
    keywords: ["Kanal 103", "alternative radio Macedonia", "avant-garde music radio"],
    frequency: "103.0 FM Skopje",
    formatEn: "alternative and avant-garde music culture",
    formatMk: "алтернативна и авангардна музичка култура",
  },
  250: {
    titleEn: "Super Radio Ohrid live",
    titleMk: "Супер Радио Охрид во живо",
    descriptionEn:
      "Listen to Super Radio Ohrid live online, a local station with music, information, and Ohrid radio tradition.",
    descriptionMk:
      "Слушај Супер Радио Охрид во живо онлајн, локална станица со музика, информации и охридска радио традиција.",
    keywords: ["Super Radio Ohrid", "Ohrid radio 97.0", "internet radio Ohrid"],
    founded: "1992",
    frequency: "97.0 FM Ohrid; internet radio since March 2026",
    formatEn: "local music, information, and humor",
    formatMk: "локална музика, информации и хумор",
  },
  260: {
    titleEn: "Urban FM 90.8 Skopje live",
    titleMk: "Urban FM 90.8 Скопје во живо",
    descriptionEn:
      "Listen to Urban FM 90.8 live from Skopje, with new Macedonian pop music, shows, podcasts, and live hosts.",
    descriptionMk:
      "Слушај Urban FM 90.8 во живо од Скопје, со нова македонска забавна музика, емисии, подкасти и водители.",
    keywords: ["Urban FM 90.8", "Urban FM Skopje", "Macedonian music radio"],
    frequency: "90.8 FM Skopje",
    formatEn: "new Macedonian mainstream and pop music",
    formatMk: "нова македонска забавна и поп музика",
  },
  320: {
    titleEn: "Radio Marija Macedonia live",
    titleMk: "Радио Марија Македонија во живо",
    descriptionEn:
      "Listen to Radio Marija Macedonia live, with prayer, church content, information, and educational programming.",
    descriptionMk:
      "Слушај Радио Марија Македонија во живо, со молитвена, црковна, информативна и едукативна програма.",
    keywords: ["Radio Marija Macedonia", "Catholic radio Macedonia", "religious radio"],
    formatEn: "religious, church, informational, and educational programming",
    formatMk: "религиозна, црковна, информативна и едукативна програма",
  },
  340: {
    titleEn: "UGD FM university radio live",
    titleMk: "УГД ФМ универзитетско радио во живо",
    descriptionEn:
      "Listen to UGD FM live, the university radio station connected with Goce Delcev University in Shtip.",
    descriptionMk:
      "Слушај УГД ФМ во живо, универзитетско радио поврзано со Универзитетот Гоце Делчев во Штип.",
    keywords: ["UGD FM", "university radio Macedonia", "Shtip campus radio"],
    formatEn: "university and campus radio",
    formatMk: "универзитетско и кампус радио",
  },
  410: {
    titleEn: "Samo MK online radio live",
    titleMk: "Само МК онлајн радио во живо",
    descriptionEn:
      "Listen to Samo MK live, an online radio station dedicated to Macedonian music throughout the day.",
    descriptionMk:
      "Слушај Само МК во живо, онлајн радио посветено на македонска музика во текот на целиот ден.",
    keywords: ["Samo MK", "Macedonian music online radio", "Само МК"],
    founded: "20 December 2022",
    formatEn: "24-hour Macedonian music",
    formatMk: "24 часа македонска музика",
  },
  465: {
    titleEn: "Jazz FM Grooves live",
    titleMk: "Jazz FM Grooves во живо",
    descriptionEn:
      "Listen to Jazz FM Grooves live, a groove-oriented sister stream from the Jazz FM family.",
    descriptionMk:
      "Слушај Jazz FM Grooves во живо, groove ориентиран сестрински стрим од Jazz FM семејството.",
    keywords: ["Jazz FM Grooves", "groove radio Macedonia", "jazz stream"],
    formatEn: "groove-oriented jazz-family stream",
    formatMk: "groove ориентиран стрим од Jazz FM семејството",
  },
  466: {
    titleEn: "Funk Soul Brother live",
    titleMk: "Funk Soul Brother во живо",
    descriptionEn:
      "Listen to Funk Soul Brother live, a Jazz FM family stream for funk and soul music.",
    descriptionMk:
      "Слушај Funk Soul Brother во живо, Jazz FM семеен стрим за funk и soul музика.",
    keywords: ["Funk Soul Brother", "soul radio Macedonia", "funk radio"],
    formatEn: "funk and soul stream",
    formatMk: "funk и soul стрим",
  },
  710: {
    titleEn: "Radio Lav Ohrid 91.5 live",
    titleMk: "Радио Лав Охрид 91.5 во живо",
    descriptionEn:
      "Listen to Radio Lav Ohrid live on 91.5 and online, with Macedonian music, culture, and diaspora-focused radio.",
    descriptionMk:
      "Слушај Радио Лав Охрид во живо на 91.5 и онлајн, со македонска музика, култура и програма поврзана со дијаспората.",
    keywords: ["Radio Lav Ohrid", "Radio Lav 91.5", "Macedonian diaspora radio"],
    founded: "14 February 1999",
    frequency: "91.5 MHz Ohrid",
    formatEn: "Macedonian culture and diaspora radio",
    formatMk: "радио за македонска култура и дијаспора",
  },
};

export function resolveStationArticleLanguage(value?: string): StationArticleLanguage {
  return value === "en" ? "en" : "mk";
}

export function getStationArticle(station: Station, language: StationArticleLanguage) {
  const seed = RESEARCH_SEEDS[station.id] ?? {};
  const stationNameEn = getStationDisplayName(station, "en");
  const stationNameMk = getStationDisplayName(station, "mk");
  const cityEn = getStationDisplayCity(station, "en");
  const cityMk = getStationDisplayCity(station, "mk");
  const factCityEn = cityEn ?? "Macedonia";
  const factCityMk = cityMk ?? "Македонија";
  const cityPhraseEn = cityEn === "Macedonia" ? "Macedonia" : cityEn;
  const cityPhraseMk = cityMk === "Македонија" ? "Македонија" : cityMk;
  const pagePath = getStationPath(station);
  const title =
    language === "mk"
      ? `${stationNameMk} во живо`
      : `Listen to ${stationNameEn} Live`;
  const description =
    language === "mk"
      ? seed.descriptionMk ??
        `Слушај ${stationNameMk} во живо преку MK Live Radio.${
          cityMk ? ` Радио станица од ${cityMk}.` : ""
        }`
      : seed.descriptionEn ??
        `Listen to ${stationNameEn} live on MK Live Radio.${
          cityEn ? ` A Macedonian radio station from ${cityEn}.` : ""
        }`;
  const keywords = [
    ...(seed.keywords ?? []),
    `${stationNameEn} live`,
    `${stationNameEn} online radio`,
    `${stationNameMk} во живо`,
    `${cityEn} radio`,
    `${cityMk} радио`,
    "MK Live Radio",
  ];

  const facts = [
    { labelEn: "City", labelMk: "Град", valueEn: factCityEn, valueMk: factCityMk },
    seed.formatEn || seed.formatMk
      ? {
          labelEn: "Format",
          labelMk: "Формат",
          valueEn: seed.formatEn ?? seed.formatMk ?? "",
          valueMk: seed.formatMk ?? seed.formatEn ?? "",
        }
      : undefined,
    seed.frequency
      ? {
          labelEn: "Frequency",
          labelMk: "Фреквенција",
          valueEn: seed.frequency,
          valueMk: seed.frequency,
        }
      : undefined,
    seed.founded
      ? {
          labelEn: "Founded",
          labelMk: "Основано",
          valueEn: seed.founded,
          valueMk: seed.founded,
        }
      : undefined,
    station.website
      ? {
          labelEn: "Official website",
          labelMk: "Официјална веб-страница",
          valueEn: station.website,
          valueMk: station.website,
        }
      : undefined,
  ].filter(Boolean) as Array<{
    labelEn: string;
    labelMk: string;
    valueEn: string;
    valueMk: string;
  }>;

  const sections =
    language === "mk"
      ? [
          {
            heading: `За ${stationNameMk}`,
            paragraphs: [
              seed.highlightMk ??
                `${stationNameMk} е македонска радио станица${
                  cityPhraseMk ? ` од ${cityPhraseMk}` : ""
                }.`,
            ],
          },
          seed.formatMk || seed.formatEn
            ? {
                heading: "Програма и музички формат",
                paragraphs: [seed.formatMk ?? seed.formatEn ?? ""],
              }
            : undefined,
          seed.frequency
            ? {
                heading: "Фреквенција",
                paragraphs: [seed.frequency],
              }
            : undefined,
          {
            heading: "Слушај онлајн",
            paragraphs: [
              `На MK Live Radio можеш да слушаш ${stationNameMk} во живо преку web player, iPhone и Android апликација.`,
            ],
          },
        ].filter(Boolean)
      : [
          {
            heading: `About ${stationNameEn}`,
            paragraphs: [
              seed.highlightEn ??
                `${stationNameEn} is a Macedonian radio station${
                  cityPhraseEn ? ` from ${cityPhraseEn}` : ""
                }.`,
            ],
          },
          seed.formatEn || seed.formatMk
            ? {
                heading: "Programming and Music Format",
                paragraphs: [seed.formatEn ?? seed.formatMk ?? ""],
              }
            : undefined,
          seed.frequency
            ? {
                heading: "Frequencies",
                paragraphs: [seed.frequency],
              }
            : undefined,
          {
            heading: "Listen Online",
            paragraphs: [
              `You can listen to ${stationNameEn} live on MK Live Radio through the web player, iPhone app, and Android app.`,
            ],
          },
        ].filter(Boolean);

  const faq =
    language === "mk"
      ? [
          {
            question: `Како да слушам ${stationNameMk} во живо?`,
            answer: `Отвори ја страницата на ${stationNameMk} и избери web player, или слушај преку iPhone и Android апликациите на MK Live Radio.`,
          },
          {
            question: `Дали ${stationNameMk} има официјална веб-страница?`,
            answer: station.website
              ? `Да. Официјалниот линк е прикажан во фактите за станицата.`
              : `Во моменталните податоци нема официјален линк за оваа станица.`,
          },
        ]
      : [
          {
            question: `How can I listen to ${stationNameEn} live?`,
            answer: `Open the ${stationNameEn} station page and choose the web player, or listen through the MK Live Radio iPhone and Android apps.`,
          },
          {
            question: `Does ${stationNameEn} have an official website?`,
            answer: station.website
              ? `Yes. The official link is shown in the station facts on this page.`
              : `The current station data does not include an official website link for this station.`,
          },
        ];

  return {
    language,
    title,
    description,
    keywords: Array.from(new Set(keywords)),
    facts,
    sections: sections as Array<{ heading: string; paragraphs: string[] }>,
    faq,
    alternatePathEn: `${pagePath}?lang=en`,
    alternatePathMk: pagePath,
  };
}
