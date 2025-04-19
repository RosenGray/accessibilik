import { useLayoutEffect } from "react";

const styleID = "acc-high-saturation-style";
const rootClass = "acc-high-saturation";

export const useHighSaturationButton = (
  isHighSaturation: boolean,
  saturation: number,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isHighSaturation && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: saturate(${saturation}%) !important;
          -ms-filter: saturate(${saturation}%) !important;
          -moz-filter: saturate(${saturation}%) !important;
          -webkit-filter: saturate(${saturation}%) !important;
          filter: saturate(${saturation}%) !important;
        }
      `;
      document.head.appendChild(style);
    } else if (isHighSaturation && style) {
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: saturate(${saturation}%) !important;
          -ms-filter: saturate(${saturation}%) !important;
          -moz-filter: saturate(${saturation}%) !important;
          -webkit-filter: saturate(${saturation}%) !important;
          filter: saturate(${saturation}%) !important;
        }
      `;
    } else if (!isHighSaturation && style) {
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [isHighSaturation, saturation, isGettingReady]);
}; 