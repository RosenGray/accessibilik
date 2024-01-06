import { FC, useLayoutEffect } from "react";
import styled from "./HighSaturationButton.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import HighSaturationIcon from "./../../../../assets/icons/highSaturation.svg?react";
import AccButton from "../../AccButton/AccButton";
import RcSlider from "../../../RcSlider/RcSlider";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";

const styleID = "acc-high-saturation-style";
const rootClass = "acc-high-saturation";

interface HighSaturationButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HighSaturationButton: FC<HighSaturationButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isHighSaturation, saturation } = accState.highSaturation;

  const increaseHighSaturationHandler = () => {
    onChangeAccState((draft) => {
      const { highSaturation } = draft;
      if (highSaturation.saturation < 800) {
        draft.highSaturation.saturation++;
      }
    });
  };
  const decreaseHighSaturationHandler = () => {
    onChangeAccState((draft) => {
      const { highSaturation } = draft;
      if (highSaturation.saturation > 200) {
        draft.highSaturation.saturation--;
      }
    });
  };
  const initHighSaturationHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.highSaturation.isHighSaturation;
      draft.highSaturation.isHighSaturation = isActive;
      draft.highSaturation.saturation = isActive ? 200 : 0;
    });
  };
  useLayoutEffect(() => {
    if (isHighSaturation) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: saturate(${saturation}%) !important;
                    -ms-filter: saturate(${saturation}%) !important;
                    -moz-filter: saturate(${saturation}%) !important;
                    -webkit-filter: saturate(${saturation}%) !important;
                    filter: saturate(${saturation}%) !important;
                }
            `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isHighSaturation, saturation]);

  return (
    <AccButton
      Icon={HighSaturationIcon}
      titleTranslationKey="colors.highSaturation"
      elementType="div"
      title="High Saturation"
      stats={isHighSaturation ? `${saturation}%` :undefined}
    >
      <div className={styled.accHighSaturation}>
        {isHighSaturation && (
          <AccValueControlButton
            onClick={increaseHighSaturationHandler}
            controlType="increase"
          />
        )}
        <AccValueControlButton
          onClick={initHighSaturationHandler}
          controlType="init"
        />

        {isHighSaturation && (
          <AccValueControlButton
            onClick={decreaseHighSaturationHandler}
            controlType="decrease"
          />
        )}
      </div>
      {isHighSaturation && (
        <RcSlider
          range
          min={200}
          max={800}
          value={saturation}
          onChange={(e) => {
            onChangeAccState((draft) => {
              draft.highSaturation.saturation = e as number;
            });
          }}
        />
      )}
    </AccButton>
  );
};

export default HighSaturationButton;
