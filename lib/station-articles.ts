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
          "Beskonechno Carstvo helps children and parents build a healthier relationship with media. The radio continues that mission through an accessible audio format that informs, sparks curiosity, and helps families manage technology without allowing it to control their lives.",
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
          "Бесконечно царство им помага на децата и родителите да создадат поздрав однос со медиумите. Радиото ја продолжува таа мисија преку достапен аудиоформат што информира, поттикнува љубопитност и им помага на семејствата да управуваат со технологијата, без таа да управува со нивниот живот.",
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
  // Researched October 2026 from each station's own website and the AVMU register of licensed broadcasters
  60: {
    descriptionEn: "Listen to Metropolis live, a nationwide Macedonian music-and-talk station broadcasting from Skopje since 2007.",
    descriptionMk: "Слушај Метрополис во живо, национална македонска музичко-говорна радио станица од Скопје, во етер од 2007 година.",
    keywords: ["Metropolis radio", "Радио Метрополис", "Metropolis 99.4", "Metropolis Skopje"],
    highlightEn: "Metropolis went on air in December 2007 and broadcasts across the country through a national network of transmitters, with 99.4 MHz in Skopje. Its music is mostly pop, with rock and electronic tracks, in both English and Macedonian.",
    highlightMk: "Метрополис почна со емитување во декември 2007 година и се слуша низ целата земја преку национална мрежа на предаватели, со 99,4 MHz во Скопје. Музиката е претежно поп, со рок и електронски нумери, на англиски и македонски јазик.",
    frequency: "99.4 MHz Skopje (national network)",
    founded: "2007",
    formatEn: "pop, rock and electronic music with talk",
    formatMk: "поп, рок и електронска музика со говорни содржини",
  },
  70: {
    descriptionEn: "Listen to Radio 105 Bombarder live, a radio station from Bitola.",
    descriptionMk: "Слушај Радио 105 Бомбардер во живо, радио станица од Битола.",
    keywords: ["Radio 105 Bombarder", "Радио 105 Бомбардер", "Bombarder radio", "Bitola radio"],
    highlightEn: "Radio 105 Bombarder comes from Bitola and greets its listeners with the motto “Секогаш со вас” – always with you.",
    highlightMk: "Радио 105 Бомбардер доаѓа од Битола и своите слушатели ги поздравува со мотото „Секогаш со вас“.",
  },
  80: {
    descriptionEn: "Listen to Radio 106 live, Bitola's music radio on 106.6 MHz since 1993.",
    descriptionMk: "Слушај Радио 106 во живо, музичкото радио на Битола на 106,6 MHz од 1993 година.",
    keywords: ["Radio 106", "Радио 106", "Radio 106 Bitola", "Cacatua Top 20"],
    highlightEn: "Radio 106 has been on air in Bitola since 1993 and calls itself the city's music leader. Its long-running Cacatua Top 20 chart show sits alongside The Breakfast Show and World Beat.",
    highlightMk: "Радио 106 емитува во Битола од 1993 година и себеси се нарекува музички лидер во градот. Долгогодишната топ-листа Cacatua Top 20 се емитува покрај The Breakfast Show и World Beat.",
    frequency: "106.6 MHz Bitola",
    founded: "1993",
    formatEn: "pop-led music radio, mostly international hits",
    formatMk: "музичко радио со претежно поп и странски хитови",
  },
  90: {
    descriptionEn: "Listen to Radio Aleksandar Makedonski live, a Kichevo station devoted to Macedonian folk music.",
    descriptionMk: "Слушај Радио Александар Македонски во живо, кичевска радио станица посветена на македонската народна музика.",
    keywords: ["Radio Aleksandar Makedonski", "Радио Александар Македонски", "Kichevo radio", "Кичево радио"],
    highlightEn: "Radio Aleksandar Makedonski first went on air on 2 August 1995, on Ilinden, in Kichevo. Its programme is built around Macedonian folk music, both traditional and newly composed.",
    highlightMk: "Радио Александар Македонски за прв пат се огласи на 2 август 1995 година, на Илинден, во Кичево. Програмата е изградена околу македонската народна музика, изворна и новокомпонирана.",
    founded: "1995",
    formatEn: "Macedonian folk music",
    formatMk: "македонска народна музика",
  },
  110: {
    descriptionEn: "Listen to City Radio live on 94.7 MHz, a music-and-talk station from Skopje.",
    descriptionMk: "Слушај City Радио во живо на 94,7 MHz, музичко-говорна радио станица од Скопје.",
    keywords: ["City Radio", "City Радио", "City Radio 94.7", "Skopje radio"],
    highlightEn: "City Radio broadcasts across Skopje on 94.7 MHz with a mix of pop, rock and electronic music in Macedonian and English. It belongs to the same group as Club FM and Metropolis.",
    highlightMk: "City Радио емитува низ Скопје на 94,7 MHz со мешавина од поп, рок и електронска музика на македонски и англиски јазик. Дел е од истата група како Club FM и Метрополис.",
    frequency: "94.7 MHz Skopje",
    formatEn: "pop, rock and electronic music with talk",
    formatMk: "поп, рок и електронска музика со говорни содржини",
  },
  120: {
    descriptionEn: "Listen to Ekspres Radio live, Strumica's music-and-talk station on 101.1 MHz since 1993.",
    descriptionMk: "Слушај Експрес Радио во живо, струмичка музичко-говорна станица на 101,1 MHz од 1993 година.",
    keywords: ["Ekspres Radio", "Експрес Радио", "Ekspres Radio Strumica", "Струмица радио"],
    highlightEn: "Ekspres Radio started in 1993 and reaches Strumica, Vasilevo, Bosilovo and Novo Selo. Weekday mornings bring a show with local city news, followed by an open programme with Macedonian pop and hits from across the former Yugoslavia.",
    highlightMk: "Експрес Радио почна во 1993 година и се слуша во Струмица, Василево, Босилово и Ново Село. Во работните денови утрото носи емисија со локални вести, а потоа следува отворена програма со македонски поп и хитови од поранешна Југославија.",
    frequency: "101.1 MHz Strumica",
    founded: "1993",
    formatEn: "Macedonian pop and ex-Yu hits with local news",
    formatMk: "македонски поп и екс-ју хитови со локални вести",
  },
  130: {
    descriptionEn: "Listen to Radio VMRO live, an online station from Bitola playing Macedonian music around the clock.",
    descriptionMk: "Слушај Радио ВМРО во живо, онлајн станица од Битола со македонска музика 24 часа.",
    keywords: ["Radio VMRO", "Радио ВМРО", "Macedonian folk radio", "македонска музика"],
    highlightEn: "Radio VMRO streams Macedonian music 24 hours a day, mostly folk, with the aim of bringing it to listeners around the world.",
    highlightMk: "Радио ВМРО емитува македонска музика 24 часа на ден, претежно народна, со цел да ја доближи до слушателите ширум светот.",
    formatEn: "Macedonian music, mostly folk",
    formatMk: "македонска музика, претежно народна",
  },
  150: {
    descriptionEn: "Listen to Radio Fortuna live on 96.8 MHz, Skopje's pop and rock station since 1993.",
    descriptionMk: "Слушај Радио Фортуна во живо на 96,8 MHz, скопско поп и рок радио од 1993 година.",
    keywords: ["Radio Fortuna", "Радио Фортуна", "Fortuna 96.8", "Skopje radio"],
    highlightEn: "Radio Fortuna has been on air in Skopje since 27 March 1993, playing pop and rock from international artists. Its motto sums it up: “Сакаме добра музика” – we love good music.",
    highlightMk: "Радио Фортуна емитува во Скопје од 27 март 1993 година, со поп и рок музика од странски изведувачи. Мотото кажува сè: „Сакаме добра музика“.",
    frequency: "96.8 MHz Skopje",
    founded: "1993",
    formatEn: "international pop and rock",
    formatMk: "странски поп и рок",
  },
  200: {
    descriptionEn: "Listen to Radio Puls live on 100.5 MHz, the music-and-talk station of Negotino and the Tikveš region.",
    descriptionMk: "Слушај Радио Пулс во живо на 100,5 MHz, музичко-говорно радио од Неготино и Тиквешијата.",
    keywords: ["Radio Puls", "Радио Пулс", "Radio Puls Negotino", "Неготино радио"],
    highlightEn: "Radio Puls has broadcast in Negotino since September 2011, mixing Macedonian folk with pop and rock, mostly in Macedonian. Shows include “За добрите стари времиња” and a special Macedonian top 10.",
    highlightMk: "Радио Пулс емитува во Неготино од септември 2011 година, со мешавина од македонска народна музика, поп и рок, претежно на македонски јазик. Меѓу емисиите се „За добрите стари времиња“ и „Специјален македонски топ 10“.",
    frequency: "100.5 MHz Negotino",
    founded: "2011",
    formatEn: "Macedonian folk, pop and rock",
    formatMk: "македонска народна музика, поп и рок",
  },
  220: {
    descriptionEn: "Listen to Club FM live on 103.4 MHz, a Skopje music station.",
    descriptionMk: "Слушај Club FM во живо на 103,4 MHz, музичко радио од Скопје.",
    keywords: ["Club FM", "Club FM 103.4", "Club FM Skopje", "Скопје радио"],
    highlightEn: "Club FM broadcasts across Skopje on 103.4 MHz. Pop leads the playlist, with room for jazz, blues, rock and electronic music. It is part of the same group as City Radio.",
    highlightMk: "Club FM емитува низ Скопје на 103,4 MHz. Поп музиката води, а простор имаат и џезот, блузот, рокот и електронската музика. Дел е од истата група како City Радио.",
    frequency: "103.4 MHz Skopje",
    formatEn: "pop with jazz, blues, rock and electronic music",
    formatMk: "поп со џез, блуз, рок и електронска музика",
  },
  240: {
    descriptionEn: "Listen to Radio Lider live on 98.1 MHz, a Skopje news and talk station.",
    descriptionMk: "Слушај Радио Лидер во живо на 98,1 MHz, скопско информативно и говорно радио.",
    keywords: ["Radio Lider", "Радио Лидер", "Lider 98.1", "Lider.mk"],
    highlightEn: "Radio Lider has been on air in Skopje since November 2020 with news, analysis and talk. It works alongside the Lider.mk news portal and its podcasts.",
    highlightMk: "Радио Лидер емитува во Скопје од ноември 2020 година со вести, анализи и разговори. Работи заедно со информативниот портал Lider.mk и неговите подкасти.",
    frequency: "98.1 MHz Skopje",
    founded: "2020",
    formatEn: "news, analysis and talk",
    formatMk: "вести, анализи и разговори",
  },
  270: {
    descriptionEn: "Listen to Bravo Radio live, an online station playing international dance hits around the clock.",
    descriptionMk: "Слушај Браво Радио во живо, онлајн станица со странски денс хитови 24 часа.",
    keywords: ["Bravo Radio", "Браво Радио", "Bravo Radio Macedonia", "dance radio"],
    highlightEn: "Bravo Radio Macedonia started in 2020 as an online station and plays international dance hits 24 hours a day, seven days a week.",
    highlightMk: "Браво Радио Македонија почна во 2020 година како онлајн станица и емитува странски денс хитови 24 часа на ден, седум дена во неделата.",
    founded: "2020",
    formatEn: "international dance hits",
    formatMk: "странски денс хитови",
  },
  280: {
    descriptionEn: "Listen to Radio Galaxy live on 102.2 MHz, a music-and-talk station from Kavadarci.",
    descriptionMk: "Слушај Радио Galaxy во живо на 102,2 MHz, музичко-говорна станица од Кавадарци.",
    keywords: ["Radio Galaxy", "Galaxy 102.2", "Galaxy Kavadarci", "Кавадарци радио"],
    highlightEn: "Galaxy broadcasts in Kavadarci on 102.2 MHz with mostly pop, plus electronic and rock music, in English and Macedonian. Its programme includes the show “Досие Галакси”.",
    highlightMk: "Galaxy емитува во Кавадарци на 102,2 MHz со претежно поп, како и електронска и рок музика, на англиски и македонски јазик. Во програмата е и емисијата „Досие Галакси“.",
    frequency: "102.2 MHz Kavadarci",
    formatEn: "pop, electronic and rock music",
    formatMk: "поп, електронска и рок музика",
  },
  290: {
    descriptionEn: "Listen to Hit Radio live, a Skopje internet station playing current hits 24 hours a day.",
    descriptionMk: "Слушај Хит Радио во живо, скопско интернет радио со актуелни хитови 24 часа.",
    keywords: ["Hit Radio", "Хит Радио", "Hit Radio Skopje", "internet radio"],
    highlightEn: "Hit Radio has streamed from Skopje since 2011 under the slogan “24 часа само хитови!” – 24 hours of nothing but hits.",
    highlightMk: "Хит Радио емитува од Скопје од 2011 година под слоганот „24 часа само хитови!“.",
    founded: "2011",
    formatEn: "current top hits",
    formatMk: "актуелни хитови",
  },
  300: {
    descriptionEn: "Listen to Life Radio live on 89.1 MHz, a music station from Skopje.",
    descriptionMk: "Слушај Life Радио во живо на 89,1 MHz, музичко радио од Скопје.",
    keywords: ["Life Radio", "Life Радио", "Life Radio 89.1", "Skopje radio"],
    highlightEn: "Life Radio is a Skopje music station broadcasting on 89.1 MHz from the Vodno transmitter, with a general music programme.",
    highlightMk: "Life Радио е скопско музичко радио што емитува на 89,1 MHz од предавателот на Водно, со општа музичка програма.",
    frequency: "89.1 MHz Skopje",
    formatEn: "general music radio",
    formatMk: "општа музичка програма",
  },
  310: {
    descriptionEn: "Listen to Radio Zona M1 live on 104.4 MHz, Skopje's Balkan music station.",
    descriptionMk: "Слушај Радио Зона М1 во живо на 104,4 MHz, скопско радио со балканска музика.",
    keywords: ["Zona M1", "Зона М1", "Zona M1 104.4", "Balkan music radio"],
    highlightEn: "Zona M1 broadcasts across Skopje on 104.4 MHz with a Balkan music programme. Listeners can send greetings in “Радио поздрави” and revisit old favourites in “Ѕвездени носталгии”.",
    highlightMk: "Зона М1 емитува низ Скопје на 104,4 MHz со балканска музичка програма. Слушателите можат да испратат поздрав во „Радио поздрави“ и да се потсетат на старите хитови во „Ѕвездени носталгии“.",
    frequency: "104.4 MHz Skopje",
    formatEn: "Balkan music",
    formatMk: "балканска музика",
  },
  330: {
    descriptionEn: "Listen to Radio S live on 87.9 MHz, the local station of Sveti Nikole.",
    descriptionMk: "Слушај Radio S во живо на 87,9 MHz, локалната станица на Свети Николе.",
    keywords: ["Radio S", "Radio S Sveti Nikole", "Свети Николе радио", "Радио Свети Николе"],
    highlightEn: "Radio S broadcasts in Sveti Nikole on 87.9 MHz as a talk-and-music station focused on local news, with music from across the former Yugoslavia.",
    highlightMk: "Radio S емитува во Свети Николе на 87,9 MHz како говорно-музичка станица насочена кон локални вести, со музика од поранешна Југославија.",
    frequency: "87.9 MHz Sveti Nikole",
    formatEn: "local news with ex-Yu music",
    formatMk: "локални вести и екс-ју музика",
  },
  350: {
    descriptionEn: "Listen to Radio Pela live on 96.8 MHz, the music-and-talk station of Prilep and Pelagonia.",
    descriptionMk: "Слушај Радио Пела во живо на 96,8 MHz, музичко-говорна станица од Прилеп и Пелагонија.",
    keywords: ["Radio Pela", "Радио Пела", "Pela Prilep", "Прилеп радио"],
    highlightEn: "Radio Pela brings music, local news and events from Prilep and the Pelagonia region under the slogan “Пелагонија на дланка!”. It also hosts the poetry evening “Љубење со стихови” and runs alongside TV Pela.",
    highlightMk: "Радио Пела носи музика, локални вести и настани од Прилеп и Пелагонија под слоганот „Пелагонија на дланка!“. Организира и поетска вечер „Љубење со стихови“, а работи заедно со ТВ Пела.",
    frequency: "96.8 MHz Prilep",
    formatEn: "music and talk with local news",
    formatMk: "музика и говорни содржини со локални вести",
  },
  360: {
    descriptionEn: "Listen to Radio 5 live on 107.1 MHz, the music, news and entertainment station of Veles.",
    descriptionMk: "Слушај Радио 5 во живо на 107,1 MHz, велешка станица за музика, вести и забава.",
    keywords: ["Radio 5", "Радио 5", "5FM Veles", "Велес радио"],
    highlightEn: "Radio 5 broadcasts in Veles on 107.1 MHz from Sveti Ilija, with music, news and entertainment around the clock.",
    highlightMk: "Радио 5 емитува во Велес на 107,1 MHz од Свети Илија, со музика, вести и забава 24 часа на ден.",
    frequency: "107.1 MHz Veles",
    formatEn: "music, news and entertainment",
    formatMk: "музика, вести и забава",
  },
  370: {
    descriptionEn: "Listen to Radio Bum live on 104.2 MHz, Kumanovo's hit station since 2014.",
    descriptionMk: "Слушај Радио Бум во живо на 104,2 MHz, кумановско радио со хитови од 2014 година.",
    keywords: ["Radio Bum", "Радио Бум", "Bum 104.2", "Куманово радио"],
    highlightEn: "Radio Bum has been on air in Kumanovo since 12 July 2014, with ex-Yu and Macedonian pop hits and local news 24 hours a day.",
    highlightMk: "Радио Бум емитува во Куманово од 12 јули 2014 година, со екс-ју и македонски поп хитови и локални вести 24 часа на ден.",
    frequency: "104.2 MHz Kumanovo",
    founded: "2014",
    formatEn: "ex-Yu and Macedonian pop hits with local news",
    formatMk: "екс-ју и македонски поп хитови со локални вести",
  },
  380: {
    descriptionEn: "Listen to Just Music live, an internet radio for jazz, soul and funk.",
    descriptionMk: "Слушај Just Music во живо, интернет радио за џез, соул и фанк.",
    keywords: ["Just Music", "Just Music radio", "jazz radio Macedonia", "џез радио"],
    highlightEn: "Just Music is an internet music radio for jazz, soul, funk and blues. Its shows include LITE JAZZ, JAZZMAN and A SUNDAY KIND OF LOVE.",
    highlightMk: "Just Music е интернет музичко радио за џез, соул, фанк и блуз. Меѓу емисиите се LITE JAZZ, JAZZMAN и A SUNDAY KIND OF LOVE.",
    formatEn: "jazz, soul, funk and blues",
    formatMk: "џез, соул, фанк и блуз",
  },
  420: {
    descriptionEn: "Listen to Time FM live, Gevgelija's station for hits, news and entertainment.",
    descriptionMk: "Слушај Time FM во живо, гевгелиско радио за хитови, вести и забава.",
    keywords: ["Time FM", "Time FM Gevgelija", "Тајм ФМ", "Гевгелија радио"],
    highlightEn: "Time FM broadcasts from Gevgelija with hits, news and entertainment, starting the day with the morning show “Добро утро Гевгелијо!”. Late nights belong to “Ноќна радио терапија”.",
    highlightMk: "Time FM емитува од Гевгелија со хитови, вести и забава, а денот го започнува со утринската програма „Добро утро Гевгелијо!“. Доцните ноќи се резервирани за „Ноќна радио терапија“.",
    formatEn: "hits, news and entertainment",
    formatMk: "хитови, вести и забава",
  },
  430: {
    descriptionEn: "Listen to Radio 22 live, an online station from Prilep with old-school music.",
    descriptionMk: "Слушај Радио 22 во живо, онлајн станица од Прилеп со олдскул музика.",
    keywords: ["Radio 22", "Радио 22", "Radio 22 Prilep", "Прилеп радио"],
    highlightEn: "Radio 22 streams from Prilep with an old-school music programme.",
    highlightMk: "Радио 22 емитува од Прилеп со олдскул музичка програма.",
    formatEn: "old-school music",
    formatMk: "олдскул музика",
  },
  440: {
    descriptionEn: "Listen to Radio Bar live, a Skopje station for electronic music.",
    descriptionMk: "Слушај Радио Бар во живо, скопско радио за електронска музика.",
    keywords: ["Radio Bar", "Радио Бар", "Radiobar Skopje", "electronic music radio"],
    highlightEn: "Radio Bar comes from Skopje and streams electronic music 24/7, with past sets archived on SoundCloud.",
    highlightMk: "Радио Бар доаѓа од Скопје и емитува електронска музика 24/7, а претходните сетови се архивирани на SoundCloud.",
    formatEn: "electronic music",
    formatMk: "електронска музика",
  },
  450: {
    descriptionEn: "Listen to Diamond Radio live, a station for new music and future classics since 2017.",
    descriptionMk: "Слушај Diamond Radio во живо, радио за нова музика и идни класици од 2017 година.",
    keywords: ["Diamond Radio", "Diamond radio Macedonia", "disco radio", "Future Classic"],
    highlightEn: "Diamond Radio started in 2017 with a focus on new music it calls “future classics”, with a strong disco influence.",
    highlightMk: "Diamond Radio почна во 2017 година, со фокус на нова музика што ја нарекува „идни класици“ и со силно диско влијание.",
    founded: "2017",
    formatEn: "new music and disco",
    formatMk: "нова музика и диско",
  },
  460: {
    descriptionEn: "Listen to Radio TIM live, a Bitola station for folk and ex-Yu music.",
    descriptionMk: "Слушај Радио ТИМ во живо, битолско радио за народна и екс-ју музика.",
    keywords: ["Radio TIM", "Радио ТИМ", "Radio TIM Bitola", "Битола радио"],
    highlightEn: "Radio TIM streams from Bitola with folk and ex-Yu music.",
    highlightMk: "Радио ТИМ емитува од Битола со народна и екс-ју музика.",
    formatEn: "folk and ex-Yu music",
    formatMk: "народна и екс-ју музика",
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
  // Many people search station names in Latin script ("antena 5"), so Macedonian titles carry both
  const nameMkWithLatin =
    stationNameMk === stationNameEn ? stationNameMk : `${stationNameMk} (${stationNameEn})`;
  const title =
    language === "mk"
      ? `${nameMkWithLatin} во живо`
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
