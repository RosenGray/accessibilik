import { useLayoutEffect } from "react";

const styleID = "acc-monochrome-style";
const rootClass = "acc-monochrome";

export const useMonochromeButton = (
  isMonochrome: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isMonochrome) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: grayscale(100%) !important;
          -ms-filter: grayscale(100%) !important;
          -moz-filter: grayscale(100%) !important;
          -webkit-filter: grayscale(100%) !important;
          filter: grayscale(100%) !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isMonochrome, isGettingReady]);
}; 