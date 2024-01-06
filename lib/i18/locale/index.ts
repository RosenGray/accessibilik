const baseUrl = 'https://accessibilik.s3.amazonaws.com/locale/';
const loadJson = async (url:string) => {
  const response = await fetch(url);
  return response.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resources:any = {};


const languageArray = [
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
  { lang: 'sd', name: 'sindhi' }
];
const promises = languageArray.map(langObj => {
  const url = `${baseUrl}${langObj.name}.json`;
  return loadJson(url);
});

Promise.all(promises).then((langs) => {
  languageArray.forEach((item,index) => {
    resources[item.lang] = {
      translation:langs[index]
    }
  })
})


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

