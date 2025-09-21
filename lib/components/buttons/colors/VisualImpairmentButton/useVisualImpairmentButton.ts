import { useLayoutEffect } from "react";

const styleID = "acc-visual-impairment-style";
const rootClass = "acc-visual-impairment";

export const useVisualImpairmentButton = (
  isVisualImpairment: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isVisualImpairment) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} {
          -o-filter: invert(100%) !important;
          -ms-filter: invert(100%) !important;
          -moz-filter: invert(100%) !important;
          -webkit-filter: invert(100%) !important;
          filter: invert(100%) !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isVisualImpairment, isGettingReady]);
}; 