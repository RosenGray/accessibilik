import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import HighContrastIcon from "./../../../../assets/icons/highcontrast.svg?react";
import styled from "./HighContrast.module.scss";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";
import RcSlider from "../../../RcSlider/RcSlider";

const styleID = "acc-high-contrast-style";
const rootClass = "acc-high-contrast";

interface HighContrastButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HighContrastButton: FC<HighContrastButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isHighContrast, contrast } = accState.highContrast;

  useLayoutEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: contrast(${contrast}%) !important;
                    -ms-filter: contrast(${contrast}%) !important;
                    -moz-filter: contrast(${contrast}%) !important;
                    -webkit-filter: contrast(${contrast}%) !important;
                    filter: contrast(${contrast}%) !important;
                }
            `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isHighContrast, contrast]);

  const increaseHighContrastHandler = () => {
    onChangeAccState((draft) => {
      const { highContrast } = draft;
      if (highContrast.contrast < 200) {
        draft.highContrast.contrast++;
      }
    });
  };
  const decreaseHighContrastHandler = () => {
    onChangeAccState((draft) => {
      const { highContrast } = draft;
      if (highContrast.contrast > 100) {
        draft.highContrast.contrast--;
      }
    });
  };
  const initHighContrastHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.highContrast.isHighContrast;
      draft.highContrast.isHighContrast = isActive;
      draft.highContrast.contrast = isActive ? 125 : 0;
    });
  };

  return (
    <AccButton
      Icon={HighContrastIcon}
      titleTranslationKey="colors.highContrast"
      elementType="div"
      title="High Contrast"
      stats={isHighContrast ? `${contrast}%` :undefined}
    >
      <div className={styled.accHighContrast}>
        {isHighContrast && (
          <AccValueControlButton
            onClick={increaseHighContrastHandler}
            controlType="increase"
          />
        )}
        <AccValueControlButton
          onClick={initHighContrastHandler}
          controlType="init"
        />

        {isHighContrast && (
          <AccValueControlButton
            onClick={decreaseHighContrastHandler}
            controlType="decrease"
          />
        )}
      </div>
      {isHighContrast && (
        <RcSlider
          range
          min={125}
          max={200}
          value={contrast}
          onChange={(e) => {
            onChangeAccState((draft) => {
              draft.highContrast.contrast = e as number;
            });
          }}
        />
      )}
    </AccButton>
  );
};

export default HighContrastButton;
