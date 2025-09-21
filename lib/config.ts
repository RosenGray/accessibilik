import ContentCopyIcon from "./assets/icons/content.svg?react";
import PaletteIcon from "./assets/icons/platte.svg?react";
import HandymanIcon from "./assets/icons/tools.svg?react";
import { IconSvgComponent } from "./types";

export const langOptions = [
  { label: "English", value: "en-US" },
  { label: "עברית", value: "he-IL" },
  { label: "Русский", value: "ru" },
  { label: "普通话", value: "zhzn" }, // Mandarin
  { label: "Español", value: "es" }, // Spanish
  { label: "العربية", value: "ar" }, // Arabic
  { label: "বাংলা", value: "bn" }, // Bengali
  { label: "हिन्दी", value: "hi" }, // Hindi
  { label: "Português", value: "ptpt" }, // Portuguese
  { label: "日本語", value: "ja" }, // Japanese
  { label: "Deutsch", value: "de" }, // German
  { label: "简体中文", value: "wuu" }, //  Chinese
  { label: "한국어", value: "ko" }, // Korean
  { label: "Français", value: "fr" }, // French  
  { label: "Türkçe", value: "tr" }, // Turkish
  { label: "Tiếng Việt", value: "vi" }, // Vietnamese
  { label: "తెలుగు", value: "te" }, // Telugu
  { label: "मराठी", value: "mr" }, // Marathi
  { label: "தமிழ்", value: "ta" }, // Tamil
  { label: "Italiano", value: "it" }, // Italian
  { label: "اردو", value: "ur" }, // Urdu
  { label: "ગુજરાતી", value: "gu" }, // Gujarati
  { label: "Polski", value: "pl" }, // Polish
  { label: "Українська", value: "uk" }, // Ukrainian
  { label: "فارسی", value: "fa" }, // Persian
  { label: "മലയാളം", value: "ml" }, // Malayalam
  { label: "ಕನ್ನಡ", value: "kn" }, // Kannada
  { label: "ଓଡ଼ିଆ", value: "or" }, // Oriya
  { label: "Română", value: "ro" }, // Romanian
  { label: "Azərbaycan", value: "az" }, // Azerbaijani
  { label: "هَوْسَ", value: "ha" }, // Hausa
  { label: "ဗမာစာ", value: "my" }, // Burmese
  { label: "српскохрватски", value: "sh" }, // Serbo-Croatian
  { label: "ไทย", value: "th" }, // Thai
  { label: "Nederlands", value: "nl" }, // Dutch
  { label: "Yorùbá", value: "yo" }, // Yoruba
  { label: "سنڌي", value: "sd" }, // Sindhi
  { label: "Latviešu", value: "lv" }, // Latvian
];

export const langMap = langOptions.reduce((acc, item) => {
  acc[item.value] = item;
  return acc;
}, {} as Record<string, { label: string; value: string }>);

type Collapsed = {
  name:string;
  isExpanded:boolean;
  icon:IconSvgComponent
}

export interface CollapsedState {
  content:Collapsed;
  colors:Collapsed;
  tools:Collapsed
}

export const collapsedStateInit:CollapsedState = {
  content: { name: "content", isExpanded: false, icon: ContentCopyIcon },
  colors: { name: "colors", isExpanded: false, icon: PaletteIcon },
  tools: { name: "tools", isExpanded: false, icon: HandymanIcon },
};

export type CollapsedStateKeys = keyof typeof collapsedStateInit;
