import { useLayoutEffect, useState } from "react";

import {
  getComputedStyleAndSetAccDataFontSize,
  isRuleAppliedToElement,
} from "../utils";
import { textTags } from "../constants";

const useFontSizeTraverse = () => {
  const [isTraversing, setIsTraversing] = useState(true);

  useLayoutEffect(() => {
    const allElements = document.querySelectorAll("*");

    allElements.forEach((element) => {
      const elem = element as HTMLElement;
      // Check inline styles
      if (elem.style.fontSize) {
        getComputedStyleAndSetAccDataFontSize(elem);
      }

      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          Array.from(sheet.cssRules || []).forEach((rule) => {
            const _rule = rule as CSSStyleRule;
            if (_rule.style.fontSize && isRuleAppliedToElement(elem, _rule)) {
              getComputedStyleAndSetAccDataFontSize(elem);
            }
          });
        } catch (error) {
          //
        }
      });

      //elmenet has no font size inline or stylesheet
      if (elem) {
        const tag = elem.tagName.toLowerCase();
        if (textTags.includes(tag)) {
          getComputedStyleAndSetAccDataFontSize(elem);
        }
      }
    });

    setIsTraversing(false);
  }, []);
  return  isTraversing 
};

export default useFontSizeTraverse;
