import { FC, useLayoutEffect } from "react";
import styled from "./LetterSpacingButton.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import { PORTAL_APP_ID } from "../../../../constants";
import AccButton from "../../AccButton/AccButton";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";
import EightMpIcon from './../../../../assets/icons/letterSpacing.svg?react';

const styleID = "acc-letter-spacing-style";
const rootClass = "acc-letter-spacing";

interface LetterSpacingButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const LetterSpacingButton: FC<LetterSpacingButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { letterSpacing } = accState;

  const increaseLetterSpacingHandler = () => {
    onChangeAccState((draft) => {
      draft.letterSpacing++;
    });
  };
  const decreaseLetterSpacingHandler = () => {
    onChangeAccState((draft) => {
      if(draft.letterSpacing > 0){
        draft.letterSpacing--
      }
    });
  };
  const initLetterSpacingHandler = () => {
    onChangeAccState((draft) => {
      draft.letterSpacing = 0;
    });
  };

  useLayoutEffect(() => {
    if (letterSpacing) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                  letter-spacing:${letterSpacing}px !important;
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [letterSpacing]);

  return (
    <AccButton
    elementType="div"
    Icon={EightMpIcon}
    titleTranslationKey={"content.letterSpacing"}
    title="Letter Spacing"
    stats={letterSpacing ? `${letterSpacing}px` : undefined}
  >
    <div className={styled.accLetterSpacing}>
      <AccValueControlButton onClick={increaseLetterSpacingHandler} controlType="increase" />
      <AccValueControlButton onClick={initLetterSpacingHandler} controlType="init" />
      <AccValueControlButton onClick={decreaseLetterSpacingHandler} controlType="decrease" />
    </div>
  </AccButton>
  )
};

export default LetterSpacingButton;
