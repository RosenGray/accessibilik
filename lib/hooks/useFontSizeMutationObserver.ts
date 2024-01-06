import { useLayoutEffect, useState } from "react";
import {
  getComputedStyleAndSetAccDataFontSize,
  isRuleAppliedToElement,
} from "../utils";
import { APP_ID, PORTAL_APP_ID, textTags } from "../constants";

const useFontSizeMutationObserver = () => {
  const [nodeListUpdated,setNodeListUpdated] = useState(0);
  useLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
 
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if(node.id === PORTAL_APP_ID || node.id === APP_ID) return;
           
              // handle inline font size
              if (node.style.fontSize) {
                getComputedStyleAndSetAccDataFontSize(node);
                node.dataset.accMutation = `true`;
                setNodeListUpdated(p => ++p);
              }
              // handle font size from css files
              Array.from(document.styleSheets).forEach((sheet) => {
                try {
                  Array.from(sheet.cssRules || []).forEach((rule) => {
                    const _rule = rule as CSSStyleRule;
                    if (
                      _rule.style.fontSize &&
                      isRuleAppliedToElement(node, _rule)
                    ) {
                      getComputedStyleAndSetAccDataFontSize(node);
                      node.dataset.accMutation = `true`;
                      setNodeListUpdated(p => ++p);
                    }
                  });
                } catch (error) {
                  //
                }
              });
              // handle textTags that the font size was not defined 
              if (node) {
                const tag = node.tagName.toLowerCase();
                if (textTags.includes(tag)) {
                  getComputedStyleAndSetAccDataFontSize(node);
                  node.dataset.accMutation = `true`;
                  setNodeListUpdated(p => ++p);
                }
              }
            }
          });
        }
      });
    });


    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      setNodeListUpdated(0)
      observer.disconnect();
    };
  }, [nodeListUpdated]);

  return nodeListUpdated
};

export default useFontSizeMutationObserver;
