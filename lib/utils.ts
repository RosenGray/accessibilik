import i18n from "i18next";
import { AccessibilikState } from "./types";

export const isRuleAppliedToElement = (
    element: HTMLElement,
    rule: CSSStyleRule
  ): boolean => {
    const matchingElements = document.querySelectorAll(rule.selectorText);
    return Array.from(matchingElements).includes(element);
  };

 export const getComputedStyleAndSetAccDataFontSize = (elem: HTMLElement) => {
    const { fontSize } = window.getComputedStyle(elem);
    elem.dataset.accOrgfontsize = parseFloat(fontSize).toString();
    elem.style.fontSize = fontSize;
  };

  export const getDataImageSvgBase64 = (svg: string) =>
  `data:image/svg+xml;base64,${window.btoa(svg)}`;

  export const getAccInitState  = ():AccessibilikState => {
    return {
      language: localStorage.getItem('i18nextLng') ?? i18n.language,
      isBlueLightFilter:false,
      brightness:{isBrightness:false,brightness:150},
      isDarkContrast:false,
      isLightContrast:false,
      highContrast:{isHighContrast:false,contrast:125},
      highSaturation:{isHighSaturation:false,saturation:200},
      lowSaturation:{isLowSaturation:false,saturation:50},
      isMonochrome:false,
      color:"",
      isVisualImpairment:false,
      adjustFontSizePercentage:100,
      textAlign:{left:null,center:null,right:null},
      isDyslexiaFont:false,
      isFontWeightBold:false,
      highlightLinks:false,
      highlightTitles:false,
      letterSpacing:0,
      lineHeight:{isLineHeight:false,lineHeight:0},
      wordSpacing:0,
      zoom:{isZoom:false,zoom:1},
      isBigCursor:false,
      showReadingGuide:false,
      activateTextToSpeech:false
    }
  }

export const registerDomain = async () => {
  try {
    const data = {
      domain: window.location.hostname,
      created: new Date().toISOString(),
    };

    const response = await fetch("https://acc-landing.vercel.app/api/registerDomain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);
  } catch (err) {
    //err
  }
};
