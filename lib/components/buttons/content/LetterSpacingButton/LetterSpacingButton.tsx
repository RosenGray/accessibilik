import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import { PORTAL_APP_ID } from "../../../../constants";
import AccButton from "../../AccButton/AccButton";
import EightMpIcon from "./../../../../assets/icons/letterSpacing.svg?react";
import AccValueControl from "../../AccValueControl/AccValueControl";

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
  const isLetterSpacing = !!letterSpacing;

  const increaseLetterSpacingHandler = () => {
    onChangeAccState((draft) => {
      draft.letterSpacing++;
    });
  };
  const decreaseLetterSpacingHandler = () => {
    onChangeAccState((draft) => {
      if (draft.letterSpacing > 0) {
        draft.letterSpacing--;
      }
    });
  };
  const toggleLetterSpacingHandler = () => {
    onChangeAccState((draft) => {
      const { letterSpacing } = draft;
      draft.letterSpacing = !letterSpacing ? 1 : 0;
    });
  };

  useLayoutEffect(() => {
    if (isLetterSpacing) {
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
  }, [letterSpacing, isLetterSpacing]);

  const renderControlButtons = () => {
    if (!isLetterSpacing) return null;
    return (
      <AccValueControl
        onIncrease={increaseLetterSpacingHandler}
        onToggle={toggleLetterSpacingHandler}
        onDescrease={decreaseLetterSpacingHandler}
      />
    );
  };

  return (
    <AccButton
      Icon={EightMpIcon}
      titleTranslationKey={"content.letterSpacing"}
      title="Letter Spacing"
      stats={letterSpacing ? `${letterSpacing}px` : undefined}
      elementType={!isLetterSpacing ? "button" : "div"}
      isActive={isLetterSpacing}
      onToggle={!isLetterSpacing ? toggleLetterSpacingHandler : undefined}
    >
      {renderControlButtons()}
    </AccButton>
  );
};

export default LetterSpacingButton;
