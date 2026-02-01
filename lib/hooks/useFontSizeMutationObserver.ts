import { useLayoutEffect, useState } from "react";
import {
  getComputedStyleAndSetAccDataFontSize,
  isRuleAppliedToElement,
} from "../utils";
import { APP_ID, PORTAL_APP_ID, textTags } from "../constants";

const useFontSizeMutationObserver = (hasHydrated: boolean) => {
  const [nodeListUpdated, setNodeListUpdated] = useState(0);
  useLayoutEffect(() => {
    if (!hasHydrated) return;

    const processElement = (elem: HTMLElement) => {
      if (elem.id === PORTAL_APP_ID || elem.id === APP_ID) return;

      if (elem.style.fontSize) {
        getComputedStyleAndSetAccDataFontSize(elem);
        elem.dataset.accMutation = `true`;
        setNodeListUpdated((p) => ++p);
      }
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          Array.from(sheet.cssRules || []).forEach((rule) => {
            const _rule = rule as CSSStyleRule;
            if (
              _rule.style.fontSize &&
              isRuleAppliedToElement(elem, _rule)
            ) {
              getComputedStyleAndSetAccDataFontSize(elem);
              elem.dataset.accMutation = `true`;
              setNodeListUpdated((p) => ++p);
            }
          });
        } catch {
          //
        }
      });
      const tag = elem.tagName.toLowerCase();
      if (textTags.includes(tag)) {
        getComputedStyleAndSetAccDataFontSize(elem);
        elem.dataset.accMutation = `true`;
        setNodeListUpdated((p) => ++p);
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.id === PORTAL_APP_ID || node.id === APP_ID) return;

              const elements: HTMLElement[] = [
                node,
                ...Array.from(node.querySelectorAll("*")),
              ].filter((el): el is HTMLElement => el instanceof HTMLElement);
              elements.forEach(processElement);
            }
          });
        }
      });
    });

    const startObserving = () => {
      if (typeof document === "undefined" || !document.body) return;
      observer.observe(document.body, { childList: true, subtree: true });
    };

    const rafId = requestAnimationFrame(startObserving);

    return () => {
      cancelAnimationFrame(rafId);
      setNodeListUpdated(0);
      observer.disconnect();
    };
  }, [hasHydrated]);

  return nodeListUpdated;
};

export default useFontSizeMutationObserver;
