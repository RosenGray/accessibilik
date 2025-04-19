import { useLayoutEffect } from "react";
import { textTags } from "../../../../constants";

const styleID = "acc-dark-contrast-style";
const rootClass = "acc-dark-contrast";

export const useDarkContrastButton = (
  isDarkContrast: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isDarkContrast) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      const textSelectors = textTags
        .map((tag) => `html.${rootClass} ${tag}`)
        .join(",");
      style.innerHTML = `
        ${textSelectors},${textTags.join(",")} {
          color:#FFF !important;
          fill: #FFF !important;
          background-color: #000 !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isDarkContrast, isGettingReady]);
}; 