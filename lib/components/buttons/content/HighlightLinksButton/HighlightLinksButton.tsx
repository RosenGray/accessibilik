import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import LinkIcon from "./../../../../assets/icons/highlightLinks.svg?react";
import AccButton from "../../AccButton/AccButton";

const styleID = "acc-highlight-links-style";
const rootClass = "acc-highlight-links";

interface HighlightLinksButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HighlightLinksButton: FC<HighlightLinksButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { highlightLinks } = accState;

  const toggleHighlightHander = () => {
    onChangeAccState((draft) => {
      draft.highlightLinks = !draft.highlightLinks;
    });
  };

  useLayoutEffect(() => {
    if (highlightLinks) {
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
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [highlightLinks]);

  return (
    <AccButton
      Icon={LinkIcon}
      isToggled={highlightLinks}
      onToggle={toggleHighlightHander}
      titleTranslationKey="content.highlightLinks"
      title="Highlight Links"
    />
  );
};

export default HighlightLinksButton;
