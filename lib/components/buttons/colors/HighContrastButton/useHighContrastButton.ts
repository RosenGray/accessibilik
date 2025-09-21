import { useLayoutEffect } from "react";

const styleID = "acc-high-contrast-style";
const rootClass = "acc-high-contrast";

export const useHighContrastButton = (
  isHighContrast: boolean,
  contrast: number,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isHighContrast && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: contrast(${contrast}%) !important;
          -ms-filter: contrast(${contrast}%) !important;
          -moz-filter: contrast(${contrast}%) !important;
          -webkit-filter: contrast(${contrast}%) !important;
          filter: contrast(${contrast}%) !important;
        }
      `;
      document.head.appendChild(style);
    } else if (isHighContrast && style) {
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: contrast(${contrast}%) !important;
          -ms-filter: contrast(${contrast}%) !important;
          -moz-filter: contrast(${contrast}%) !important;
          -webkit-filter: contrast(${contrast}%) !important;
          filter: contrast(${contrast}%) !important;
        }
      `;
    } else if (!isHighContrast && style) {
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [isHighContrast, contrast, isGettingReady]);
}; 