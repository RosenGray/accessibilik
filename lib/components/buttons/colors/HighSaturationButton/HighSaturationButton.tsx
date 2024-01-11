import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import HighSaturationIcon from "./../../../../assets/icons/highSaturation.svg?react";
import AccButton from "../../AccButton/AccButton";
import RcSlider from "../../../RcSlider/RcSlider";
import AccValueControl from "../../AccValueControl/AccValueControl";

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
  const toggleHighSaturationHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.highSaturation.isHighSaturation;
      draft.highSaturation.isHighSaturation = isActive;
      draft.highSaturation.saturation = isActive ? 200 : 0;
    });
  };

  const renderControlButtons = () => {
    if (!isHighSaturation) return null;
    return (
      <AccValueControl
        onIncrease={increaseHighSaturationHandler}
        onToggle={toggleHighSaturationHandler}
        onDescrease={decreaseHighSaturationHandler}
      />
    );
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
      title="High Saturation"
      stats={isHighSaturation ? `${saturation}%` : undefined}
      elementType={!isHighSaturation ? "button" : "div"}
      isActive={isHighSaturation}
      onToggle={!isHighSaturation ? toggleHighSaturationHandler : undefined}
    >
      {renderControlButtons()}

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
