export const baseUrl = 'https://acc-landing.vercel.app/locale/';

export const loadJson = async (url:string) => {
  const response = await fetch(url);
  return response.json();
}
export type Translation = {
  translation:string;
}
export type Resources = Record<string,Translation>

export const languageArray = [
  { lang: 'he', name: 'hebrew' },
  { lang: 'en', name: 'english' },
  { lang: 'ru', name: 'russian' },
  { lang: 'zhcn', name: 'chineseMandarin' },
  { lang: 'es', name: 'spanish' },
  { lang: 'ar', name: 'arabic' },
  { lang: 'bn', name: 'bengali' },
  { lang: 'hi', name: 'hindi' },
  { lang: 'ptpt', name: 'portuguese' },
  { lang: 'ja', name: 'japanese' },
  { lang: 'de', name: 'german' },
  { lang: 'wuu', name: 'chinese' },
  { lang: 'ko', name: 'korean' },
  { lang: 'fr', name: 'french' },
  { lang: 'tr', name: 'turkish' },
  { lang: 'vi', name: 'vietnamese' },
  { lang: 'te', name: 'telugu' },
  { lang: 'mr', name: 'marathi' },
  { lang: 'ta', name: 'tamil' },
  { lang: 'it', name: 'italian' },
  { lang: 'ur', name: 'urdu' },
  { lang: 'gu', name: 'gujarati' },
  { lang: 'pl', name: 'polish' },
  { lang: 'uk', name: 'ukrainian' },
  { lang: 'fa', name: 'persian' },
  { lang: 'ml', name: 'malayalam' },
  { lang: 'kn', name: 'kannada' },
  { lang: 'or', name: 'oriya' },
  { lang: 'ro', name: 'romanian' },
  { lang: 'az', name: 'azerbaijani' },
  { lang: 'ha', name: 'hausa' },
  { lang: 'my', name: 'burmese' },
  { lang: 'sh', name: 'serboCroatian' },
  { lang: 'th', name: 'thai' },
  { lang: 'nl', name: 'dutch' },
  { lang: 'yo', name: 'yoruba' },
  { lang: 'sd', name: 'sindhi' },
  { lang: 'lv', name: 'latviski' }
];

export const getLanguagePromises = () => {
  return languageArray.map(langObj => {
    const url = `${baseUrl}${langObj.name}.json`;
    return loadJson(url);
  });
}

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
  "lv",
];



export const rtlLanguages = ["ar", "fa", "he", "he-IL", "ur"];



