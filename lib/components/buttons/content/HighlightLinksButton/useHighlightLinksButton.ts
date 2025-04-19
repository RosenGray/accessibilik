import { useLayoutEffect } from "react";

const styleID = "acc-highlight-links-style";
const rootClass = "acc-highlight-links";

export const useHighlightLinksButton = (
  highlightLinks: boolean,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);

    if (highlightLinks && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
            html.${rootClass} a[href],a[href] {
            outline: 2px solid var(--highlight-color) !important;
            outline-offset: 2px !important;
        }
    `;
      document.head.appendChild(style);
    } else if (!highlightLinks && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [highlightLinks, isGettingReady]);
};
