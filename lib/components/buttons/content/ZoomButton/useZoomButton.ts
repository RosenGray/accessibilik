import { useLayoutEffect } from "react";
import { PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-zoom-style";
const rootClass = "acc-zoom";

export const useZoomButton = (
  zoomState: { zoom: number; isZoom: boolean },
  isGettingReady?: boolean
) => {
  const { zoom, isZoom } = zoomState;
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isZoom && !style) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                html.${rootClass} body *:not(#${PORTAL_APP_ID}, #${PORTAL_APP_ID} *) {
                zoom: ${zoom.toFixed(1)} !important;
               }
                }
            `;
      document.head.appendChild(style);
    } else if (isZoom && style) {
      style.innerHTML = `
                html.${rootClass} body *:not(#${PORTAL_APP_ID}, #${PORTAL_APP_ID} *) {
                zoom: ${zoom.toFixed(1)} !important;
               }
                }
            `;
    } else if (!isZoom && style) {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [zoom, isZoom, isGettingReady]);
};
