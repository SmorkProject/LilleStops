export type Tab = 'trajets' | 'search' | 'settings';
export type Language =
  | 'fr'  // Français
  | 'en'  // Anglais
  | 'es'  // Espagnol
  | 'de'  // Allemand
  | 'it'  // Italien
  | 'pt'  // Portugais
  | 'ru'  // Russe
  | 'zh'  // Chinois
  | 'ja'  // Japonais
  | 'ko'  // Coréen
  | 'ar'  // Arabe
  | 'hi'  // Hindi
  | 'bn'  // Bengali
  | 'pl'  // Polonais
  | 'nl'  // Néerlandais
  | 'tr'  // Turc
  | 'sv'  // Suédois
  | 'no'  // Norvégien
  | 'da'  // Danois
  | 'fi'  // Finnois
  | 'el'  // Grec
  | 'th'  // Thaï
  | 'vi'  // Vietnami
  | 'cs'  // Tchèque
  | 'hu'  // Hongrois
  | 'ro'  // Roumain
  | 'sk'  // Slovaque
  | 'he'  // Hébreu
  | 'uk'  // Ukrainien
  | 'bg'  // Bulgare
  | 'lv'  // Letton
  | 'lt'  // Lituanien
  | 'sl'  // Slovène
  | 'et'  // Estonien
  | 'is'  // Islandais
  | 'ms'  // Malais
  | 'mt'  // Maltais
  | 'tl'  // Tagalog
  | 'sw'  // Swahili
  | 'yi'  // Yiddish
  | 'fa'  // Persan
  | 'km'  // Khmer
  | 'my'  // Birman
  | 'am'  // Amharique
  | 'ne'  // Népalais
  | 'pa'  // Pendjabi
  | 'tk'  // Turkmène
  | 'uz'  // Ouzbek
  | 'sa'  // Sanscrit
  ;
export type Theme = 'white' | 'black';

export interface TrajetInfo {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface VLilleStation {
  id: string;
  name: string;
  city: string;
  status: string;
  bikes: number;
  docks: number;
};

export interface SettingsViewProps {
  theme: Theme;
  lang: Language;
  trajets: TrajetInfo[] | [];
  themeFile: any;
  onChangeTheme: (theme: Theme) => void;
  onAddTrajet: () => void;
  onDeleteTrajet: (trajetId: string) => void;
  onUpdateTrajetName: (trajetId: string, newName: string) => void;
  onLangChange: (lang: Language) => void;
}

export interface SearchViewProps {
  lang: Language;
  themeFile: any;
  setBoxType: (datas: any) => void;
  setBoxname: (datas: any) => void;
  setBoxId: (datas: any) => void;
  setBoxCity: (datas: any) => void;
  setBoxDisplay: (datas: any) => void;
}

export interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  themeFile: any;
}

export const TRAJET_PRESETS: Omit<TrajetInfo, 'id' | 'name'>[] = [
  { emoji: "🔴", color: "#e2001a" },
  { emoji: "🔵", color: "#3b82f6" },
  { emoji: "🟢", color: "#22c55e" },
  { emoji: "🟡", color: "#eab308" },
  { emoji: "🟣", color: "#a855f7" },
  { emoji: "🟠", color: "#f97316" },
];

export interface VLilleViewProps {
  stations: VLilleStation[];
  isLoading: boolean;
  onStartAddToTrajet: (station: VLilleStation) => void;
}

export interface Trajet {
  id: string;
  emoji: string;
  name: string;
}

export const colorNames: { [key: string]: string } = {
  "#e2001a": "red",
  "#3b82f6": "blue",
  "#22c55e": "green",
  "#eab308": "yellow",
  "#a855f7": "purple",
  "#f97316": "orange",
};

export const LINE_COLORS: { [key: string]: { bg: string; text: string } } = {
  // Metros (yellow, red, orange)
  'M1': { bg: '#F6C433', text: '#000000' },
  'M2': { bg: '#E2001A', text: '#FFFFFF' },
  'B1': { bg: '#F39200', text: '#FFFFFF' },
  // Tram
  'TRAM': { bg: '#00A4E4', text: '#FFFFFF' },
  'BRT': { bg: '#F39200', text: '#FFFFFF' },
  // Liane lines (dark blue)
  'N1': { bg: '#252C62', text: '#FFFFFF' },
  'L1': { bg: '#003A70', text: '#FFFFFF' },
  'L2': { bg: '#003A70', text: '#FFFFFF' },
  'L3': { bg: '#003A70', text: '#FFFFFF' },
  'L4': { bg: '#003A70', text: '#FFFFFF' },
  'L5': { bg: '#003A70', text: '#FFFFFF' },
  'L6': { bg: '#003A70', text: '#FFFFFF' },
  'L7': { bg: '#003A70', text: '#FFFFFF' },
  'L8': { bg: '#003A70', text: '#FFFFFF' },
  // Other Lianes (teal)
  'L90': { bg: '#009A93', text: '#FFFFFF' },
  'L91': { bg: '#009A93', text: '#FFFFFF' },
  'L91E': { bg: '#009A93', text: '#FFFFFF' },
  'L92': { bg: '#009A93', text: '#FFFFFF' },
  'L99': { bg: '#009A93', text: '#FFFFFF' },
  // Corolles (pinks/purples)
  'C8': { bg: '#F0909A', text: '#000000' },
  'C9': { bg: '#E6007E', text: '#FFFFFF' },
  'C10': { bg: '#E6007E', text: '#FFFFFF' },
  'C11': { bg: '#E6007E', text: '#FFFFFF' },
  'C12': { bg: '#D0006F', text: '#FFFFFF' },
  // Citadines (pinks/purples)
  'CITS': { bg: '#A60084', text: '#FFFFFF' },
  'CITA': { bg: '#A60084', text: '#FFFFFF' },
  'CITH': { bg: '#A60084', text: '#FFFFFF' },
  'CITL': { bg: '#A60084', text: '#FFFFFF' },
  'CITT': { bg: '#A60084', text: '#FFFFFF' },
  'NVL': { bg: '#D0006F', text: '#FFFFFF' },
  // CO lines (browns)
  'CO1': { bg: '#7E4B28', text: '#FFFFFF' },
  'CO2': { bg: '#7E4B28', text: '#FFFFFF' },
  'CO3': { bg: '#7E4B28', text: '#FFFFFF' },
  // Main lines (various colors)
  '9': { bg: '#00833E', text: '#FFFFFF' },
  '10': { bg: '#00833E', text: '#FFFFFF' },
  '13': { bg: '#00833E', text: '#FFFFFF' },
  '14': { bg: '#00833E', text: '#FFFFFF' },
  '15': { bg: '#00833E', text: '#FFFFFF' },
  '17': { bg: '#006747', text: '#FFFFFF' },
  '18': { bg: '#8DC63F', text: '#000000' },
  '30': { bg: '#F39200', text: '#FFFFFF' },
  '32': { bg: '#F39200', text: '#FFFFFF' },
  '33': { bg: '#8DC63F', text: '#000000' },
  '33A': { bg: '#000000', text: '#FFFFFF' },
  '34': { bg: '#FDB913', text: '#000000' },
  '35': { bg: '#F39200', text: '#FFFFFF' },
  '36': { bg: '#F39200', text: '#FFFFFF' },
  '50': { bg: '#FDB913', text: '#000000' },
  '51': { bg: '#F39200', text: '#FFFFFF' },
  '52': { bg: '#92278F', text: '#FFFFFF' },
  '55': { bg: '#8DC63F', text: '#000000' },
  '58': { bg: '#F39200', text: '#FFFFFF' },
  '60E': { bg: '#7E4B28', text: '#FFFFFF' },
  '61': { bg: '#9E94BF', text: '#FFFFFF' },
  '62': { bg: '#8DC63F', text: '#000000' },
  '64': { bg: '#F39200', text: '#FFFFFF' },
  '65': { bg: '#6B4C9A', text: '#FFFFFF' },
  '66': { bg: '#F39200', text: '#FFFFFF' },
  '67': { bg: '#FDB913', text: '#000000' },
  '68': { bg: '#6B4C9A', text: '#FFFFFF' },
  '72': { bg: '#252C62', text: '#FFFFFF' },
  '73': { bg: '#252C62', text: '#FFFFFF' },
  '75': { bg: '#A6A429', text: '#FFFFFF' },
  '76': { bg: '#A62E25', text: '#FFFFFF' },
  '78': { bg: '#F39200', text: '#FFFFFF' },
  '80': { bg: '#FDB913', text: '#000000' },
  '81': { bg: '#9E94BF', text: '#FFFFFF' },
  '82': { bg: '#F39200', text: '#FFFFFF' },
  '84': { bg: '#E2001A', text: '#FFFFFF' },
  '86': { bg: '#E2001A', text: '#FFFFFF' },
  '87': { bg: '#FDB913', text: '#000000' },
  '88': { bg: '#6B4C9A', text: '#FFFFFF' },
  '89': { bg: '#A6A429', text: '#FFFFFF' },
  '236': { bg: '#7E4B28', text: '#FFFFFF' },
  '955': { bg: '#000000', text: '#FFFFFF' },
  'Z1': { bg: '#F39200', text: '#FFFFFF' },
  'Z2': { bg: '#F39200', text: '#FFFFFF' },
  'Z3': { bg: '#F39200', text: '#FFFFFF' },
  'Z4': { bg: '#E2001A', text: '#FFFFFF' },
  'Z6': { bg: '#E2001A', text: '#FFFFFF' },
  'Z8': { bg: '#E2001A', text: '#FFFFFF' },
  'MWR': { bg: '#252C62', text: '#FFFFFF' },
  '20R': { bg: '#E2001A', text: '#FFFFFF' },
  '21R': { bg: '#E2001A', text: '#FFFFFF' },
  '22R': { bg: '#E2001A', text: '#FFFFFF' },
  '23R': { bg: '#A62E25', text: '#FFFFFF' },
  '24R': { bg: '#E2001A', text: '#FFFFFF' },
  '25R': { bg: '#A62E25', text: '#FFFFFF' },
  '26R': { bg: '#7E4B28', text: '#FFFFFF' },
  '27R': { bg: '#E2001A', text: '#FFFFFF' },
  '28R': { bg: '#E2001A', text: '#FFFFFF' },
  '29R': { bg: '#E2001A', text: '#FFFFFF' },
  '61R': { bg: '#A6A429', text: '#FFFFFF' },
  '62R': { bg: '#8DC63F', text: '#000000' },
  '64R': { bg: '#F39200', text: '#FFFFFF' },
  '65R': { bg: '#A6A429', text: '#FFFFFF' },
  '69R': { bg: '#FDB913', text: '#000000' },
  '70R': { bg: '#F39200', text: '#FFFFFF' },
  '74R': { bg: '#F39200', text: '#FFFFFF' },
  '75R': { bg: '#8DC63F', text: '#000000' },
  '76R': { bg: '#A62E25', text: '#FFFFFF' },
  '77R': { bg: '#000000', text: '#FFFFFF' },
  '82R': { bg: '#F39200', text: '#FFFFFF' },
  '901': { bg: '#919395', text: '#000000' },
  '902': { bg: '#919395', text: '#000000' },
  '903': { bg: '#919395', text: '#000000' },
  '904': { bg: '#919395', text: '#000000' },
  '905': { bg: '#919395', text: '#000000' },
  '906': { bg: '#919395', text: '#000000' },
  '907': { bg: '#919395', text: '#000000' },
  '908': { bg: '#919395', text: '#000000' },
  '909': { bg: '#919395', text: '#000000' },
  '910': { bg: '#919395', text: '#000000' },
  '911': { bg: '#919395', text: '#000000' },
  '912': { bg: '#919395', text: '#000000' },
  '913': { bg: '#919395', text: '#000000' },
  '914': { bg: '#919395', text: '#000000' },
  '915': { bg: '#919395', text: '#000000' },
  '916': { bg: '#919395', text: '#000000' },
  '917': { bg: '#919395', text: '#000000' },
  '919': { bg: '#919395', text: '#000000' },
  '920': { bg: '#919395', text: '#000000' },
  '921': { bg: '#919395', text: '#000000' },
  '922': { bg: '#919395', text: '#000000' },
  '923': { bg: '#919395', text: '#000000' },
  '924': { bg: '#919395', text: '#000000' },
  '926': { bg: '#919395', text: '#000000' },
  '927': { bg: '#919395', text: '#000000' },
  '928': { bg: '#919395', text: '#000000' },
  '929': { bg: '#919395', text: '#000000' },
  '930': { bg: '#919395', text: '#000000' },
  '931': { bg: '#919395', text: '#000000' },
  '932': { bg: '#919395', text: '#000000' },
  '934': { bg: '#919395', text: '#000000' },
  '935': { bg: '#919395', text: '#000000' },
  '938': { bg: '#919395', text: '#000000' },
  '940': { bg: '#919395', text: '#000000' },
  '941': { bg: '#919395', text: '#000000' },
  '942': { bg: '#919395', text: '#000000' },
  '943': { bg: '#919395', text: '#000000' },
  '944': { bg: '#919395', text: '#000000' },
  '945': { bg: '#919395', text: '#000000' },
  '967': { bg: '#919395', text: '#000000' },
  '968': { bg: '#919395', text: '#000000' },
  '969': { bg: '#919395', text: '#000000' },
  '975': { bg: '#919395', text: '#000000' },
  '978': { bg: '#919395', text: '#000000' },
  'B2': { bg: '#000000', text: '#FFFFFF' },
  'STADE / STADIUM': { bg: '#252C62', text: '#FFFFFF' },
  'default': { bg: '#6b7280', text: '#FFFFFF' }
};

export type SearchProps = {
  allStops: string[];
  onSearch: (stopName: string) => void;
};

export const translations: Record<any, any> = {
  fr: require('../langs/fr').default,     // Français (France)
  en: require('../langs/en').default,     // Anglais (Royaume-Uni)
  es: require('../langs/es').default,     // Espagnol (Espagne)
  de: require('../langs/de').default,     // Allemand (Allemagne)
  it: require('../langs/it').default,     // Italien (Italie)
  pt: require('../langs/pt').default,     // Portugais (Portugal)
  ru: require('../langs/ru').default,     // Russe (Russie)
  zh: require('../langs/zh').default,     // Chinois (Chine)
  ja: require('../langs/jp').default,     // Japonais (Japon)
  ko: require('../langs/ko').default,     // Coréen (Corée du Sud)
  ar: require('../langs/ar').default,     // Arabe (Émirats Arabes Unis)
  hi: require('../langs/hi').default,     // Hindi (Inde)
  bn: require('../langs/bn').default,     // Bengali (Bangladesh)
  pl: require('../langs/pl').default,     // Polonais (Pologne)
  nl: require('../langs/nl').default,     // Néerlandais (Pays-Bas)
  tr: require('../langs/tr').default,     // Turc (Turquie)
  sv: require('../langs/sv').default,     // Suédois (Suède)
  no: require('../langs/no').default,     // Norvégien (Norvège)
  da: require('../langs/da').default,     // Danois (Danemark)
  fi: require('../langs/fi').default,     // Finnois (Finlande)
  el: require('../langs/el').default,     // Grec (Grèce)
  th: require('../langs/th').default,     // Thaï (Thaïlande)
  vi: require('../langs/vi').default,     // Vietnamien (Vietnam)
  cs: require('../langs/cs').default,     // Tchèque (République tchèque)
  hu: require('../langs/hu').default,     // Hongrois (Hongrie)
  ro: require('../langs/ro').default,     // Roumain (Roumanie)
  sk: require('../langs/sk').default,     // Slovaque (Slovaquie)
  he: require('../langs/he').default,     // Hébreu (Israël)
  uk: require('../langs/uk').default,     // Ukrainien (Ukraine)
  bg: require('../langs/bg').default,     // Bulgare (Bulgarie)
  lv: require('../langs/lv').default,     // Letton (Lettonie)
  lt: require('../langs/lt').default,     // Lituanien (Lituanie)
  sl: require('../langs/sl').default,     // Slovène (Slovénie)
  et: require('../langs/et').default,     // Estonien (Estonie)
  is: require('../langs/is').default,     // Islandais (Islande)
  ms: require('../langs/ms').default,     // Malais (Malaisie)
  mt: require('../langs/mt').default,     // Maltais (Malte)
  tl: require('../langs/tl').default,     // Tagalog (Philippines)
  sw: require('../langs/sw').default,     // Swahili (Kenya)
  fa: require('../langs/fa').default,     // Persan (Iran)
  km: require('../langs/km').default,     // Khmer (Cambodge)
  my: require('../langs/my').default,     // Birman (Birmanie)
  am: require('../langs/am').default,     // Amharique (Éthiopie)
  ne: require('../langs/ne').default,     // Népalais (Népal)
  pa: require('../langs/pa').default,     // Pendjabi (Pakistan)
  tk: require('../langs/tk').default,     // Turkmène (Turkménistan)
  uz: require('../langs/uz').default,     // Ouzbek (Ouzbékistan)
  sa: require('../langs/sa').default,     // Sanskrit (Inde)
  yi: require('../langs/yi').default,     // Yiddish (Israël
};

export const langs: Language[] = [
  "fr", // Français 
  "en", // Anglais
  "es", // Espagnol
  "de", // Allemand
  "it", // Italien
  "pt", // Portugais
  "ru", // Russe
  "zh", // Chinois
  "ja", // Japonais
  "ko", // Coréen
  "ar", // Arabe
  "hi", // Hindi
  "bn", // Bengali
  "pl", // Polonais
  "nl", // Néerlandais
  "tr", // Turc
  "sv", // Suédois
  "no", // Norvégien
  "da", // Danois
  "fi", // Finnois
  "el", // Grec
  "th", // Thaï
  "vi", // Vietnamien
  "cs", // Tchèque
  "hu", // Hongrois
  "ro", // Roumain
  "sk", // Slovaque
  "he", // Hébreu
  "uk", // Ukrainien
  "bg", // Bulgare
  "lv", // Letton
  "lt", // Lituanien
  "sl", // Slovène
  "et", // Estonien
  "is", // Islandais
  "ms", // Malais
  "mt", // Maltais
  "tl", // Tagalog
  "sw", // Swahili
  "yi", // Yiddish
  "fa", // Persan
  "km", // Khmer
  "my", // Birman
  "am", // Amharique
  "ne", // Népalais
  "pa", // Pendjabi
  "tk", // Turkmène
  "uz", // Ouzbek
  "sa", // Sanscrit
];

export const flags: Record<Language, any> = {
  fr: require('../assets/langs/fr.png'),     // Français (France)
  en: require('../assets/langs/gb.png'),     // Anglais (Royaume-Uni)
  es: require('../assets/langs/es.png'),     // Espagnol (Espagne)
  de: require('../assets/langs/de.png'),     // Allemand (Allemagne)
  it: require('../assets/langs/it.png'),     // Italien (Italie)
  pt: require('../assets/langs/pt.png'),     // Portugais (Portugal)
  ru: require('../assets/langs/ru.png'),     // Russe (Russie)
  zh: require('../assets/langs/cn.png'),     // Chinois (Chine)
  ja: require('../assets/langs/jp.png'),     // Japonais (Japon)
  ko: require('../assets/langs/kr.png'),     // Coréen (Corée du Sud)
  ar: require('../assets/langs/ae.png'),     // Arabe (Émirats Arabes Unis)
  hi: require('../assets/langs/in.png'),     // Hindi (Inde)
  bn: require('../assets/langs/bd.png'),     // Bengali (Bangladesh)
  pl: require('../assets/langs/pl.png'),     // Polonais (Pologne)
  nl: require('../assets/langs/nl.png'),     // Néerlandais (Pays-Bas)
  tr: require('../assets/langs/tr.png'),     // Turc (Turquie)
  sv: require('../assets/langs/se.png'),     // Suédois (Suède)
  no: require('../assets/langs/no.png'),     // Norvégien (Norvège)
  da: require('../assets/langs/dk.png'),     // Danois (Danemark)
  fi: require('../assets/langs/fi.png'),     // Finnois (Finlande)
  el: require('../assets/langs/gr.png'),     // Grec (Grèce)
  th: require('../assets/langs/th.png'),     // Thaï (Thaïlande)
  vi: require('../assets/langs/vn.png'),     // Vietnamien (Vietnam)
  cs: require('../assets/langs/cz.png'),     // Tchèque (République tchèque)
  hu: require('../assets/langs/hu.png'),     // Hongrois (Hongrie)
  ro: require('../assets/langs/ro.png'),     // Roumain (Roumanie)
  sk: require('../assets/langs/sk.png'),     // Slovaque (Slovaquie)
  he: require('../assets/langs/il.png'),     // Hébreu (Israël)
  uk: require('../assets/langs/ua.png'),     // Ukrainien (Ukraine)
  bg: require('../assets/langs/bg.png'),     // Bulgare (Bulgarie)
  lv: require('../assets/langs/lv.png'),     // Letton (Lettonie)
  lt: require('../assets/langs/lt.png'),     // Lituanien (Lituanie)
  sl: require('../assets/langs/si.png'),     // Slovène (Slovénie)
  et: require('../assets/langs/ee.png'),     // Estonien (Estonie)
  is: require('../assets/langs/is.png'),     // Islandais (Islande)
  ms: require('../assets/langs/my.png'),     // Malais (Malaisie)
  mt: require('../assets/langs/mt.png'),     // Maltais (Malte)
  tl: require('../assets/langs/ph.png'),     // Tagalog (Philippines)
  sw: require('../assets/langs/ke.png'),     // Swahili (Kenya)
  fa: require('../assets/langs/ir.png'),     // Persan (Iran)
  km: require('../assets/langs/kh.png'),     // Khmer (Cambodge)
  my: require('../assets/langs/mm.png'),     // Birman (Birmanie)
  am: require('../assets/langs/et.png'),     // Amharique (Éthiopie)
  ne: require('../assets/langs/np.png'),     // Népalais (Népal)
  pa: require('../assets/langs/pk.png'),     // Pendjabi (Pakistan)
  tk: require('../assets/langs/tm.png'),     // Turkmène (Turkménistan)
  uz: require('../assets/langs/uz.png'),     // Ouzbek (Ouzbékistan)
  sa: require('../assets/langs/in.png'),     // Sanskrit (Inde)
  yi: require('../assets/langs/il.png'),     // Yiddish (Israël)
};

export const themes = {
  black: require('../styles/theme/black'),
  white: require('../styles/theme/white'),
};

export interface BoxAddInTrajetshViewProps {
  setBoxDisplay: (data: boolean) => void;
  AddInTrajets: (trajet: any) => void;
  themeFile: any;
  translate: any;
  boxCity: any;
  boxName: any;
  boxtype: any;
  trajets: any;
};

export interface TrajetsViewPop {
  lang: string;
  trajets: TrajetInfo[];
  trajetsDatas: any;
  deleteTrajets: (index: number, id: any) => any,
  themeFile: any;
};

export interface CountDownViewPop {
  targetDate: Date;
  txt: string;
  style2: any;
};

export interface NavigatorButtonViewPop {
  onPress: () => void;
  isActive: boolean;
  children: String;
  'aria-label': string;
  themeFile: any;
};