import { useLayoutEffect } from "react";

const styleID = "acc-brightness-control-style";
const rootClass = "acc-brightness-control";

export const useBrightnessControl = (
  isBrightness: boolean,
  brightness: number,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isBrightness && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: brightness(${brightness}%) !important;
          -ms-filter: brightness(${brightness}%) !important;
          -moz-filter: brightness(${brightness}%) !important;
          -webkit-filter: brightness(${brightness}%) !important;
          filter: brightness(${brightness}%) !important;
        }
      `;
      document.head.appendChild(style);
    } else if (isBrightness && style) {
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: brightness(${brightness}%) !important;
          -ms-filter: brightness(${brightness}%) !important;
          -moz-filter: brightness(${brightness}%) !important;
          -webkit-filter: brightness(${brightness}%) !important;
          filter: brightness(${brightness}%) !important;
        }
      `;
    } else if (!isBrightness && style) {
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [isBrightness, brightness, isGettingReady]);
}; 