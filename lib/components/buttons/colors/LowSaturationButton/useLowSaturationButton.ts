import { useLayoutEffect } from "react";

const styleID = "acc-low-saturation-style";
const rootClass = "acc-low-saturation";

export const useLowSaturationButton = (
  isLowSaturation: boolean,
  saturation: number,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isLowSaturation && !style) {
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
    } else if (isLowSaturation && style) {
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: saturate(${saturation}%) !important;
          -ms-filter: saturate(${saturation}%) !important;
          -moz-filter: saturate(${saturation}%) !important;
          -webkit-filter: saturate(${saturation}%) !important;
          filter: saturate(${saturation}%) !important;
        }
      `;
    } else if (!isLowSaturation && style) {
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [isLowSaturation, saturation, isGettingReady]);
}; 