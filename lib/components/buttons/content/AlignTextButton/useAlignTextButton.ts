import { useLayoutEffect } from "react";
import { PORTAL_APP_ID } from "../../../../constants";
import { TextAlign } from "../../../../types";

const rootClass = "acc-align-text";

export const useAlignTextButton = (
  textAlign: TextAlign,
  isGettingReady?: boolean
) => {
  const currentDirection = Object.values(textAlign).find((v) => v);

  useLayoutEffect(() => {
    if (isGettingReady) return;
    if (currentDirection) {
      const style = document.getElementById(
        `acc-align-text-style-${currentDirection}`
      );
      if (!style) {
        document.documentElement.classList.add(rootClass);
        const style = document.createElement("style");
        style.id = `acc-align-text-style-${currentDirection}`;
        style.innerHTML = `
                html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                text-align:${currentDirection} !important
            }
            `;
        document.head.appendChild(style);
      }
    }
  }, [currentDirection, isGettingReady, textAlign]);

  useLayoutEffect(() => {
    if (isGettingReady) return;
    if (!textAlign.left) {
      const style = document.getElementById("acc-align-text-style-left");
      if (style) {
        style.remove();
        document.documentElement.classList.remove(rootClass);
      }
    }
    if (!textAlign.right) {
      const style = document.getElementById("acc-align-text-style-right");
      if (style) {
        style.remove();
        document.documentElement.classList.remove(rootClass);
      }
    }
    if (!textAlign.center) {
      const style = document.getElementById("acc-align-text-style-center");
      if (style) {
        style.remove();
        document.documentElement.classList.remove(rootClass);
      }
    }
  }, [textAlign]);
};
