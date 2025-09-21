import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import EightMpIcon from "./../../../../assets/icons/letterSpacing.svg?react";
import AccValueControl from "../../AccValueControl/AccValueControl";

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
