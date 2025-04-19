import { useLayoutEffect } from "react";

const styleID = "acc-font-weight-style";
const rootClass = "acc-font-weight";

export const useFontWeightButton = (
  isFontWeightBold: boolean,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (!isGettingReady) {
      const style = document.getElementById(styleID);
      if (isFontWeightBold && !style) {
        document.documentElement.classList.add(rootClass);
        const style = document.createElement("style");
        style.id = styleID;
        style.innerHTML = `
                    html.${rootClass} *, *  {
                    font-weight:700 !important;
                  }
              `;
        document.head.appendChild(style);
      } else if (!isFontWeightBold && style) {
        document.documentElement.classList.remove(rootClass);
        style?.remove();
      }
    }
  }, [isFontWeightBold, isGettingReady]);
};
