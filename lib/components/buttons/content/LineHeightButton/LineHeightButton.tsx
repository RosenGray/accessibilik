import { FC } from "react";
import styled from "./LineHeightButton.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import TextRotateUpIcon from "./../../../../assets/icons/lineHeight.svg?react";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";

interface LineHeightButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const LineHeightButton: FC<LineHeightButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { lineHeight, isLineHeight } = accState.lineHeight;

  const increaseLineHeightHandler = () => {
    onChangeAccState((draft) => {
      draft.lineHeight.lineHeight += 0.1;
    });
  };
  const decreaseLineHeightHandler = () => {
    onChangeAccState((draft) => {
      if (draft.lineHeight.lineHeight > 0.1) {
        draft.lineHeight.lineHeight -= 0.1;
      }
    });
  };
  const lineHeighToggleHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.lineHeight.isLineHeight;
      draft.lineHeight.isLineHeight = isActive;
      draft.lineHeight.lineHeight = isActive ? 3 : 0;
    });
  };

  const renderControlButtons = () => {
    if (!isLineHeight) return null;
    return (
      <div className={styled.accLineHeightButton}>
        {isLineHeight && (
          <AccValueControlButton
            onClick={increaseLineHeightHandler}
            controlType="increase"
          />
        )}
        <AccValueControlButton
          onClick={lineHeighToggleHandler}
          controlType="init"
        />
        {isLineHeight && (
          <AccValueControlButton
            onClick={decreaseLineHeightHandler}
            controlType="decrease"
          />
        )}
      </div>
    );
  };

  return (
    <AccButton
      Icon={TextRotateUpIcon}
      titleTranslationKey={"content.lineHeight"}
      title="Line Height"
      elementType={!isLineHeight ? "button" : "div"}
      isActive={isLineHeight}
      onToggle={!isLineHeight ? lineHeighToggleHandler : undefined}
      stats={lineHeight ? `${(lineHeight * 100).toFixed(0)}%` : undefined}
    >
      {renderControlButtons()}
    </AccButton>
  );
};

export default LineHeightButton;
