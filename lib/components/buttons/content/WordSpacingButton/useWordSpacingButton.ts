import { useLayoutEffect } from "react";
import { APP_ID, PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-word-spacing-style";
const rootClass = "acc-word-spacing";

export const useWordSpacingButton = (
  wordSpacing: number,
  isGettingReady?: boolean
) => {
  const isWordSpacing = !!wordSpacing;
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isWordSpacing && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                 html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${APP_ID} *)  {
                  word-spacing:${wordSpacing}px !important;
                }
            `;
      document.head.appendChild(style);
    } else if (isWordSpacing && style) {
      style.innerHTML = `
                 html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${APP_ID} *)  {
                  word-spacing:${wordSpacing}px !important;
                }
            `;
    } else if (!isWordSpacing && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [wordSpacing, isWordSpacing, isGettingReady]);
};
