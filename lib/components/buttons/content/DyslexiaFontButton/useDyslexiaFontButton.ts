import { useLayoutEffect } from "react";
import DYSLEXIA_FONT_STYLE from "./style";

const styleID = "acc-dyslexia-font-style";
const rootClass = "acc-dyslexia-font";

export const useDyslexiaFontButton = (
  isDyslexiaFont: boolean,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID); 
    if (isDyslexiaFont && !style) {
      document.documentElement.classList.add(rootClass);
        const style = document.createElement("style");
        style.id = styleID;
        style.innerHTML = DYSLEXIA_FONT_STYLE;
        document.head.appendChild(style);
    } else if (!isDyslexiaFont && style) {
        document.documentElement.classList.remove(rootClass);
        style?.remove();
    }   
  }, [isDyslexiaFont, isGettingReady]);
};
