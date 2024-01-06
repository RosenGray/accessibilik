import english from "./english.json";
import hebrew from "./hebrew.json";
import russian from "./russian.json";
import chineseMandarin from "./chineseMandarin.json";
import spanish from "./spanish.json";
import arabic from "./arabic.json";
import bengali from "./bengali.json";
import hindi from "./hindi.json";
import portuguese from "./portuguese.json";
import japanese from "./japanese.json";
import german from "./german.json";
import chinese from "./chinese.json";
import korean from "./korean.json";
import french from "./french.json";
import turkish from "./turkish.json";
import vietnamese from "./vietnamese.json";
import telugu from "./telugu.json";
import marathi from "./marathi.json";
import tamil from "./tamil.json";
import italian from "./italian.json";
import urdu from "./urdu.json";
import gujarati from "./gujarati.json";
import polish from "./polish.json";
import ukrainian from "./ukrainian.json";
import persian from "./persian.json";
import malayalam from "./malayalam.json";
import kannada from "./kannada.json";
import oriya from "./oriya.json";
import romanian from "./romanian.json";
import azerbaijani from "./azerbaijani.json";
import hausa from "./hausa.json";
import burmese from "./burmese.json";
import serboCroatian from "./serboCroatian.json";
import thai from "./thai.json";
import dutch from "./dutch.json";
import yoruba from "./yoruba.json";
import sindhi from "./sindhi.json";


const resources = {
  he: { translation: hebrew },
  en: { translation: english },
  ru: { translation: russian },
  zhcn: { translation: chineseMandarin },
  es: { translation: spanish },
  ar: { translation: arabic },
  bn: { translation: bengali },
  hi: { translation: hindi },
  ptpt: { translation: portuguese },
  ja: { translation: japanese },
  de: { translation: german },
  wuu: { translation: chinese },
  ko: { translation: korean },
  fr: { translation: french },
  tr: { translation: turkish },
  vi: { translation: vietnamese },
  te: { translation: telugu },
  mr: { translation: marathi },
  ta: { translation: tamil },
  it: { translation: italian },
  ur: { translation: urdu },
  gu: { translation: gujarati },
  pl: { translation: polish },
  uk: { translation: ukrainian },
  fa: { translation: persian },
  ml: { translation: malayalam },
  kn: { translation: kannada },
  or: { translation: oriya },
  ro: { translation: romanian },
  az: { translation: azerbaijani }, 
  ha: { translation: hausa },
  my: { translation: burmese },
  sh: { translation: serboCroatian },
  th: { translation: thai },
  nl: { translation: dutch },
  yo: { translation: yoruba },
  sd: { translation: sindhi }
};

export default resources;

export const languages = [
  "en-US",
  "he-IL",
  "ru",
  "zhcn",
  "es",
  "ar",
  "bn",
  "hi",
  "ptpt",
  "ja",
  "de",
  "wuu",
  "ko",
  "fr",
  "tr",
  "vi",
  "te",
  "yue",
  "mr",
  "ta",
  "it",
  "ur",
  "gu",
  "pl",
  "uk",
  "fa",
  "ml",
  "kn",
  "or",
  "ro",
  "az",
  "ha",
  "my",
  "sh",
  "th",
  "nl",
  "yo",
  "sd",
];



export const rtlLanguages = ["ar", "fa", "he", "he-IL", "ur"];
