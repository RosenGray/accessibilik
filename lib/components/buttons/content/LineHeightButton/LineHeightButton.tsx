import { FC, useLayoutEffect } from "react";
import styled from "./LineHeightButton.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import { PORTAL_APP_ID } from "../../../../constants";
import AccButton from "../../AccButton/AccButton";
import TextRotateUpIcon from "./../../../../assets/icons/lineHeight.svg?react";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";

const styleID = "acc-line-height-style";
const rootClass = "acc-line-height";

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
      if(draft.lineHeight.lineHeight > 0.1){
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

  useLayoutEffect(() => {
    if (isLineHeight && lineHeight) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                  line-height:${lineHeight.toFixed(1)} !important
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [lineHeight, isLineHeight]);

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
      stats={lineHeight ? `${(lineHeight * 100).toFixed(0)}%`: undefined}
    >
      {renderControlButtons()}
    </AccButton>
  );
};

export default LineHeightButton;
