import { FC, useLayoutEffect } from "react";
import styled from "./WordSpacingButton.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import { PORTAL_APP_ID } from "../../../../constants";
import AccButton from "../../AccButton/AccButton";
import MenuBookIcon from "./../../../../assets/icons/wordSpacing.svg?react";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";

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
  const initWordSpacingHandler = () => {
    onChangeAccState((draft) => {
      draft.wordSpacing = 0;
    });
  };

  useLayoutEffect(() => {
    if (wordSpacing) {
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
  }, [wordSpacing]);

  return (
    <AccButton
      elementType="div"
      Icon={MenuBookIcon}
      titleTranslationKey={"content.wordsSpacing"}
      title="Word Spacing"
      stats={wordSpacing ? `${wordSpacing}px` : undefined}
    >
      <div className={styled.accWordSpacing}>
        <AccValueControlButton
          onClick={increaseWordSpacingHandler}
          controlType="increase"
        />
        <AccValueControlButton
          onClick={initWordSpacingHandler}
          controlType="init"
        />
        <AccValueControlButton
          onClick={decreaseWordSpacingHandler}
          controlType="decrease"
        />
      </div>
    </AccButton>
  );
};

export default WordSpacingButton;
