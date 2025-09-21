import { useLayoutEffect } from "react";

const styleID = "acc-highlight-titles-style";
const rootClass = "acc-highlight-titles";

export const useHighlightTitlesButton = (
  highlightTitles: boolean,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);

    if (highlightTitles && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
          html.${rootClass} h1,h2,h3,h4,h5,h6,h1,h2,h3,h4,h5,h6  {
          outline: 2px solid var(--highlight-color) !important;
          outline-offset: 2px !important;
      }
  `;
      document.head.appendChild(style);
    } else if (!highlightTitles && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [highlightTitles, isGettingReady]);
};
