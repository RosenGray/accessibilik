import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import TitleIcon from './../../../../assets/icons/highlightTitles.svg?react';
import AccButton from "../../AccButton/AccButton";

const styleID = "acc-highlight-titles-style";
const rootClass = "acc-highlight-titles";

interface HighlightTitlesButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HighlightTitlesButton: FC<HighlightTitlesButtonProps> = ({accState,onChangeAccState}) => {
  const {highlightTitles} = accState;

  const toggleHighlightHander = () => {
    onChangeAccState(draft => {
      draft.highlightTitles = !draft.highlightTitles;
    })
  };

  useLayoutEffect(() => {
    if (highlightTitles) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                    html.${rootClass} h1,h2,h3,h4,h5,h6,h1,h2,h3,h4,h5,h6  {
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
    }
  }, [highlightTitles]);

  return (
    <AccButton
      Icon={TitleIcon}
      isToggled={highlightTitles}
      onToggle={toggleHighlightHander}
      titleTranslationKey="content.highlightTitles"
      title="Highlight Titles"
    />
  );
};

export default HighlightTitlesButton;
