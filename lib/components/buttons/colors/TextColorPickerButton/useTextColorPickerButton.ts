import { textTags } from "../../../../constants";
import { useLayoutEffect, useMemo } from "react";
import { PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-text-color-picker-style";
const rootClass = "acc-text-color-picker";

export const useTextColorPickerButton = (
  color: string,
  isGettingReady: boolean
) => {
  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1;
      const HTML = `html.${rootClass}`;
      const delimiter = index === lastIndex ? "" : ",";
      return (acc += `${HTML} ${tag}:not(#${PORTAL_APP_ID} *)${delimiter}`);
    }, "");
  }, []);
  const joinedTags = textTags
    .map((tag) => `${tag}:not(#${PORTAL_APP_ID} *)`)
    .join(",");

  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (color && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  ${textSelectors},${joinedTags} {
                  color: ${color} !important;
                }
            `;
      document.head.appendChild(style);
    } else if (color && style) {
      style.innerHTML = `
                  ${textSelectors},${joinedTags} {
                  color: ${color} !important;
                }
            `;
    } else if (!color && style) {
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [color, joinedTags, textSelectors, isGettingReady]);
};
