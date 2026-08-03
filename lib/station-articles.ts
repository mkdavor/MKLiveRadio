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
  sectionsEn?: Array<{ heading: string; paragraphs: string[] }>;
  sectionsMk?: Array<{ heading: string; paragraphs: string[] }>;
  principlesEn?: Array<{ title: string; description: string }>;
  principlesMk?: Array<{ title: string; description: string }>;
  team?: Array<{ nameEn: string; nameMk: string; roleEn: string; roleMk: string }>;
  contacts?: Array<{ labelEn: string; labelMk: string; value: string; href?: string }>;
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
      "Jazz FM is a Skopje radio station dedicated to jazz and related styles. Its carefully curated programming celebrates authentic artistic expression while helping listeners discover the evolution, movements, and artists of jazz.",
    highlightMk:
      "Џез ФМ е скопско радио посветено на џез музиката и сродните џез стилови. Преку грижливо осмислена програма го слави автентичниот уметнички израз и ги запознава слушателите со еволуцијата, правците и уметниците на џезот.",
    frequency: "100.8 FM Skopje",
    formatEn: "jazz and groove programming",
    formatMk: "џез и groove програма",
    sectionsEn: [
      {
        heading: "A home for the local jazz scene",
        paragraphs: [
          "The station supports quality music and education from the Macedonian and regional jazz scene, helping jazz remain a meaningful part of the country's cultural life. It presents emerging talent, works with musicians, and connects listeners around a shared love of the genre.",
        ],
      },
      {
        heading: "Vision",
        paragraphs: [
          "Jazz FM wants jazz to become an essential and accessible part of Macedonia's media and cultural landscape, while encouraging the growth and promotion of jazz musicians and regional production.",
        ],
      },
      {
        heading: "Jazz as a journey around the world",
        paragraphs: [
          "In her show Daily Session, author and host Jasna Nikolovska Ovcharovska takes listeners on a musical walk through different countries, exploring their distinctive jazz sound with a special focus on contemporary currents and younger generations of musicians.",
          "The idea is to reveal the atmosphere, colour, and sound of different places through the way jazz develops inside their cultures — offering discovery, inspiration, and a fresh moment in the day.",
        ],
      },
    ],
    sectionsMk: [
      {
        heading: "Дом за локалната џез сцена",
        paragraphs: [
          "Радиото поддржува квалитетна музичка програма и едукација од домашната и регионалната џез сцена, со цел џезот да остане значаен дел од македонскиот културен живот. Претставува нови таленти, соработува со музичари и ги поврзува слушателите во заедница.",
        ],
      },
      {
        heading: "Визија",
        paragraphs: [
          "Визијата на Џез ФМ е џезот да стане суштински и достапен дел од македонскиот медиумски и културен пејзаж, а преку емитувањето да го поттикнува растежот на џез музичарите и регионалната продукција.",
        ],
      },
      {
        heading: "Џезот како патување низ светот",
        paragraphs: [
          "Во емисијата „Дневна сесија“, авторката и водителка Јасна Николовска Овчаровска ги носи слушателите на музичка прошетка низ различни земји и нивниот специфичен џез звук, со посебен фокус на современите текови и младата генерација музичари.",
          "Целта е преку џезот да се откријат атмосферата, колоритот и звучниот амбиент на различни култури, нудејќи дневна инспирација и освежување во етерот.",
        ],
      },
    ],
    principlesEn: [
      {
        title: "Quality",
        description: "Every selected feature and playlist is expected to meet the station's editorial and production standards.",
      },
      {
        title: "Relevance",
        description: "Verified stories, interviews, analysis, and playlists help explain jazz history, styles, development, and artists.",
      },
      {
        title: "Accessibility",
        description: "Jazz FM aims to remove barriers and make the world of jazz easy to discover for listeners of every age and profession.",
      },
      {
        title: "Community",
        description: "By supporting the local scene, collaborating with musicians, and staying close to listeners, the station builds a wider jazz network.",
      },
      {
        title: "Local talent and young artists",
        description: "New talent and Macedonian performers receive space on air, helping jazz reach and inspire a younger audience.",
      },
      {
        title: "Innovation",
        description: "New perspectives, experimentation, and developments in the genre keep the programming dynamic, relevant, and curious.",
      },
    ],
    principlesMk: [
      {
        title: "Квалитет",
        description: "Секоја избрана содржина и плејлиста треба да ги задоволи уредувачките и продукциските стандарди на радиото.",
      },
      {
        title: "Релевантност",
        description: "Проверени информации, интервјуа, анализи и плејлисти ги доближуваат историјата, развојот, стиловите и уметниците на џезот.",
      },
      {
        title: "Достапност",
        description: "Jazz FM ги разбива бариерите и го прави светот на џезот лесен за откривање од слушатели од сите возрасти и професии.",
      },
      {
        title: "Заедништво",
        description: "Со поддршка на локалната сцена, соработка со музичарите и поврзување со слушателите, радиото гради широка џез заедница.",
      },
      {
        title: "Домашна сцена и млади",
        description: "Новите таленти и домашните изведувачи добиваат простор во програмата, со што џезот се доближува и до помладата публика.",
      },
      {
        title: "Иновативност",
        description: "Нови перспективи, експериментирање и следење на развојот на жанрот ја одржуваат програмата динамична и релевантна.",
      },
    ],
    team: [
      { nameEn: "Kostadin Shurbanovski", nameMk: "Костадин Шурбановски", roleEn: "Editor", roleMk: "Уредник" },
      { nameEn: "Marijan Grijaković", nameMk: "Маријан Гријаковиќ", roleEn: "Technical team", roleMk: "Техника" },
      { nameEn: "Jasna Nikolovska Ovcharovska", nameMk: "Јасна Николовска Овчаровска", roleEn: "Daytime host", roleMk: "Водител – дневна програма" },
      { nameEn: "Darko Markovski", nameMk: "Дарко Марковски", roleEn: "Host", roleMk: "Водител" },
      { nameEn: "Jez Nelson & Chris Philips", nameMk: "Jez Nelson & Chris Philips", roleEn: "Contributors", roleMk: "Соработници" },
    ],
    contacts: [
      { labelEn: "Email", labelMk: "Е-пошта", value: "jazzfm@jazz.mk", href: "mailto:jazzfm@jazz.mk" },
      { labelEn: "Telephone", labelMk: "Телефон", value: "+389 2 615 5150", href: "tel:+38926155150" },
      { labelEn: "Mobile", labelMk: "Мобилен", value: "+389 70 342 376", href: "tel:+38970342376" },
    ],
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
  315: {
    titleEn: "Beskonechno Radio live",
    titleMk: "Бесконечно радио во живо",
    descriptionEn:
      "Listen to Beskonechno Radio live from Vinica, with educational content for children, parents, media literacy, and healthier screen habits.",
    descriptionMk:
      "Слушај Бесконечно радио во живо од Виница, со едукативни содржини за деца, родители, медиумска писменост и поздрави навики пред екран.",
    keywords: [
      "Beskonechno Radio",
      "Бесконечно радио",
      "Beskonechno Carstvo",
      "Бесконечно царство",
      "children's educational radio Macedonia",
      "медиумска едукација за деца",
    ],
    highlightEn:
      "Beskonechno Radio grows from the Beskonechno Carstvo educational project in Vinica, created by Nikolina to bring thoughtful media, learning, and practical support closer to children and parents.",
    highlightMk:
      "Бесконечно радио произлегува од едукативниот проект Бесконечно царство од Виница, создаден од Николина за квалитетни медиумски содржини, учење и практична поддршка за децата и родителите.",
    formatEn: "education, media literacy, children, and parenting",
    formatMk: "едукација, медиумска писменост, деца и родителство",
    sectionsEn: [
      {
        heading: "A story that began in 2013",
        paragraphs: [
          "The Beskonechno Carstvo story began in 2013 with a children's programme on local television. That first format developed into a wider educational mission rooted in Vinica and built around the way children experience media.",
        ],
      },
      {
        heading: "Expertise behind the microphone",
        paragraphs: [
          "Nikolina brings together journalism and public relations, postgraduate research in preschool pedagogy focused on media and children, and experience as an educator, curriculum creator, trainer, journalist, and radio host. More than twenty specialist courses have further shaped the project's practical approach.",
        ],
      },
      {
        heading: "A healthier relationship with media",
        paragraphs: [
          "Beskonechno Carstvo helps children and parents find a better balance between screens and everyday life. The radio extends that mission through an accessible audio format designed to inform, encourage curiosity, and support families.",
        ],
      },
    ],
    sectionsMk: [
      {
        heading: "Приказна што започна во 2013 година",
        paragraphs: [
          "Приказната на Бесконечно царство започна во 2013 година со детска емисија на локална телевизија. Првиот формат прерасна во поширока едукативна мисија со корени во Виница, посветена на начинот на кој децата ги доживуваат медиумите.",
        ],
      },
      {
        heading: "Знаење и искуство зад микрофонот",
        paragraphs: [
          "Николина ги спојува новинарството и односите со јавност, постдипломското истражување по предучилишна педагогија на тема медиуми и деца, како и искуството како едукатор, креатор на наставни програми, тренер, новинар и радио-водител. Практичниот пристап на проектот е надграден и со повеќе од дваесет специјализирани курсеви.",
        ],
      },
      {
        heading: "Поздрав однос со медиумите",
        paragraphs: [
          "Бесконечно царство им помага на децата и родителите да создадат подобар баланс меѓу времето пред екран и секојдневниот живот. Радиото ја продолжува таа мисија преку достапен аудио формат што информира, поттикнува љубопитност и ги поддржува семејствата.",
        ],
      },
    ],
    principlesEn: [
      {
        title: "Media literacy",
        description: "Content helps children and parents understand media and use it with greater awareness.",
      },
      {
        title: "Healthy balance",
        description: "The project encourages a thoughtful balance between screen time and everyday experiences.",
      },
      {
        title: "Learning with purpose",
        description: "Research, education, and hands-on experience shape practical content for families.",
      },
    ],
    principlesMk: [
      {
        title: "Медиумска писменост",
        description: "Содржините им помагаат на децата и родителите посвесно да ги разбираат и користат медиумите.",
      },
      {
        title: "Здрав баланс",
        description: "Проектот поттикнува внимателна рамнотежа меѓу времето пред екран и секојдневните искуства.",
      },
      {
        title: "Учење со цел",
        description: "Истражувањето, едукацијата и практичното искуство создаваат корисни содржини за семејствата.",
      },
    ],
    team: [
      {
        nameEn: "Nikolina Petrovska",
        nameMk: "Николина Петровска",
        roleEn: "Founder, educator, and radio host",
        roleMk: "Основач, едукатор и радио-водител",
      },
    ],
    contacts: [
      {
        labelEn: "Email",
        labelMk: "Е-пошта",
        value: "info@beskonechno-carstvo.mk",
        href: "mailto:info@beskonechno-carstvo.mk",
      },
    ],
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
              `На MK Live Radio можеш да слушаш ${stationNameMk} во живо преку Android или iOS апликацијата, или алтернативно преку web player-от на страницата.`,
            ],
          },
          ...(seed.sectionsMk ?? []),
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
              `You can listen to ${stationNameEn} live on MK Live Radio through the Android or iOS app, or alternatively through the web player on the page.`,
            ],
          },
          ...(seed.sectionsEn ?? []),
        ].filter(Boolean);

  const faq =
    language === "mk"
      ? [
          {
            question: `Како да слушам ${stationNameMk} во живо?`,
            answer: `${stationNameMk} можеш да ја слушаш во живо на MK Live Radio. Најубаво искуство е преку Android или iOS апликацијата, а алтернативно можеш да слушаш и преку web player-от на страницата.`,
          },
        ]
      : [
          {
            question: `How can I listen to ${stationNameEn} live?`,
            answer: `You can listen to ${stationNameEn} live on MK Live Radio. The best experience is on the Android or iOS app, and you can alternatively listen through the web player on the page.`,
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
    principles: language === "mk" ? seed.principlesMk : seed.principlesEn,
    team: seed.team?.map((member) => ({
      name: language === "mk" ? member.nameMk : member.nameEn,
      role: language === "mk" ? member.roleMk : member.roleEn,
    })),
    contacts: seed.contacts?.map((contact) => ({
      label: language === "mk" ? contact.labelMk : contact.labelEn,
      value: contact.value,
      href: contact.href,
    })),
    alternatePathEn: `/en${pagePath}`,
    alternatePathMk: pagePath,
  };
}
