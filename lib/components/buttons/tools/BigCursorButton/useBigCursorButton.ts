import { useLayoutEffect } from "react";
import { getDataImageSvgBase64 } from "../../../../utils";
import cursor from "./cursor";

const styleID = "acc-big-cursor-style";
const rootClass = "acc-big-cursor";

export const useBigCursorButton = (
  isBigCursor: boolean,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);

    if (isBigCursor && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
          html.${rootClass}  body * {
           cursor:url(${getDataImageSvgBase64(cursor)}),default !important;}
   `;
      document.head.appendChild(style);
    } else if (!isBigCursor && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [isBigCursor, isGettingReady]);
};
