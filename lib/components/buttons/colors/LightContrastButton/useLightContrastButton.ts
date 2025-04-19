import { useLayoutEffect } from "react";
import { textTags } from "../../../../constants";

const styleID = "acc-light-contrast-style";
const rootClass = "acc-light-contrast";

export const useLightContrastButton = (
  isLightContrast: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isLightContrast) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      const textSelectors = textTags
        .map((tag) => `html.${rootClass} ${tag}`)
        .join(",");
      style.innerHTML = `
        ${textSelectors},${textTags.join(",")} {
          color:#000 !important;
          fill: #000 !important;
          background-color: #FFF !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isLightContrast, isGettingReady]);
}; 