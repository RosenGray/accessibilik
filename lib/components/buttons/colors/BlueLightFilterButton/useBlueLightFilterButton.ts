import { useLayoutEffect } from "react";

const styleID = "acc-blueLight-filter-style";
const rootClass = "acc-blue-light-filter";

export const useBlueLightFilterButton = (
  isBlueLightFilter: boolean,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (!isGettingReady) {
      const style = document.getElementById(styleID);
      if (isBlueLightFilter && !style) {
        document.documentElement.classList.add(rootClass);
        const style = document.createElement("style");
        style.id = styleID;
        style.innerHTML = `
          html.${rootClass} {
            -o-filter: sepia(80%) !important;
            -ms-filter: sepia(80%) !important;
            -moz-filter: sepia(80%) !important;
            -webkit-filter: sepia(80%) !important;
            filter: sepia(80%) !important;
          }
        `;
        document.head.appendChild(style);
      } else if (!isBlueLightFilter && style) {
        document.documentElement.classList.remove(rootClass);
        style?.remove();
      }
    }
  }, [isBlueLightFilter, isGettingReady]);
}; 