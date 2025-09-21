import { useLayoutEffect } from "react";
import { PORTAL_APP_ID } from "../../../../constants";
const styleID = "acc-letter-spacing-style";
const rootClass = "acc-letter-spacing";

export const useLetterSpacingButton = (
  letterSpacing: number,
  isGettingReady?: boolean
) => {
  const isLetterSpacing = !!letterSpacing;
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isLetterSpacing && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
            html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
            letter-spacing:${letterSpacing}px !important;
          }
      `;
      document.head.appendChild(style);
    } else if (isLetterSpacing && style) {
      style.innerHTML = `
        html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
        letter-spacing:${letterSpacing}px !important;
      }
  `;
    } else if (!isLetterSpacing && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [letterSpacing, isLetterSpacing, isGettingReady]);
};
