import { useLayoutEffect } from "react";
import { PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-line-height-style";
const rootClass = "acc-line-height";

export const useLineHeightButton = (
  lineHeightState: { lineHeight: number; isLineHeight: boolean },
  isGettingReady?: boolean
) => {
  const { lineHeight, isLineHeight } = lineHeightState;
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isLineHeight && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                  line-height:${lineHeight.toFixed(1)} !important
                }
            `;
      document.head.appendChild(style);
    } else if (isLineHeight && style) {
      style.innerHTML = `
                  html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                  line-height:${lineHeight.toFixed(1)} !important
                }
            `;
    } else if (!isLineHeight && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [lineHeight, isLineHeight, isGettingReady]);
};
