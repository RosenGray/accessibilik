import { useLayoutEffect } from "react";

const getNodesByDataAttrAndAdjustFontSize = (
  dataAttr: string,
  percentage: number
) => {
  const elements = document.querySelectorAll(`[${dataAttr}]`);
  elements.forEach((elem) => {
    if (elem && elem instanceof HTMLElement && elem.dataset.accOrgfontsize) {
      const prevFontSize = +elem.dataset.accOrgfontsize;
      const newFontSize = (prevFontSize * percentage) / 100;
      elem.style.fontSize = `${newFontSize}px`;
    }
  });
};

export const useAdjustFontSize = (
  adjustFontSizePercentage: number,
  nodeListUpdated: number,
  isGettingReady?: boolean
) => {
  useLayoutEffect(() => {
    if (!isGettingReady) {
      if (nodeListUpdated > 0) {
        getNodesByDataAttrAndAdjustFontSize(
          "data-acc-mutation",
          adjustFontSizePercentage
        );
      }
    }
  }, [adjustFontSizePercentage, nodeListUpdated, isGettingReady]);

  useLayoutEffect(() => {
    if (!isGettingReady) {
      getNodesByDataAttrAndAdjustFontSize(
        "data-acc-orgfontsize",
        adjustFontSizePercentage
      );
    }
  }, [adjustFontSizePercentage, isGettingReady]);
};
