import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import { PORTAL_APP_ID } from "../../../../constants";
import AccButton from "../../AccButton/AccButton";
import MenuBookIcon from "./../../../../assets/icons/wordSpacing.svg?react";
import AccValueControl from "../../AccValueControl/AccValueControl";

const styleID = "acc-word-spacing-style";
const rootClass = "acc-word-spacing";

interface WordSpacingButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const WordSpacingButton: FC<WordSpacingButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { wordSpacing } = accState;
  const isWordSpacing = !!wordSpacing;

  const increaseWordSpacingHandler = () => {
    onChangeAccState((draft) => {
      draft.wordSpacing++;
    });
  };
  const decreaseWordSpacingHandler = () => {
    onChangeAccState((draft) => {
      if (draft.wordSpacing > 0) {
        draft.wordSpacing--;
      }
    });
  };
  const toggleWordSpacingHandler = () => {
    onChangeAccState((draft) => {
      const { wordSpacing } = draft;
      draft.wordSpacing = !wordSpacing ? 1 : 0;
    });
  };

  useLayoutEffect(() => {
    if (isWordSpacing) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                 html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                  word-spacing:${wordSpacing}px !important;
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [wordSpacing,isWordSpacing]);

  const renderControlButtons = () => {
    if (!isWordSpacing) return null;
    return (
      <AccValueControl
        onIncrease={increaseWordSpacingHandler}
        onToggle={toggleWordSpacingHandler}
        onDescrease={decreaseWordSpacingHandler}
      />
    );
  };

  return (
    <AccButton
      Icon={MenuBookIcon}
      titleTranslationKey={"content.wordsSpacing"}
      title="Word Spacing"
      stats={wordSpacing ? `${wordSpacing}px` : undefined}
      elementType={!isWordSpacing ? "button" : "div"}
      isActive={isWordSpacing}
      onToggle={!isWordSpacing ? toggleWordSpacingHandler : undefined}
    >
      {renderControlButtons()}
    </AccButton>
  );
};

export default WordSpacingButton;
