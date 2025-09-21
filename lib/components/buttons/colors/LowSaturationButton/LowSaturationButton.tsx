import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import HighSaturationIcon from "./../../../../assets/icons/highSaturation.svg?react";
import AccButton from "../../AccButton/AccButton";
import RcSlider from "../../../RcSlider/RcSlider";
import AccValueControl from "../../AccValueControl/AccValueControl";

interface LowSaturationButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}
const LowSaturationButton: FC<LowSaturationButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isLowSaturation, saturation } = accState.lowSaturation;

  const increaseLowSaturationHandler = () => {
    onChangeAccState((draft) => {
      const { lowSaturation } = draft;
      if (lowSaturation.saturation < 199) {
        draft.lowSaturation.saturation++;
      }
    });
  };
  const decreaseLowSaturationHandler = () => {
    onChangeAccState((draft) => {
      const { lowSaturation } = draft;
      if (lowSaturation.saturation > 50) {
        draft.lowSaturation.saturation--;
      }
    });
  };
  const toggleLowSaturationHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.lowSaturation.isLowSaturation;
      draft.lowSaturation.isLowSaturation = isActive;
      draft.lowSaturation.saturation = isActive ? 50 : 0;
    });
  };

  const renderControlButtons = () => {
    if (!isLowSaturation) return null;
    return (
      <AccValueControl
        onIncrease={increaseLowSaturationHandler}
        onToggle={toggleLowSaturationHandler}
        onDescrease={decreaseLowSaturationHandler}
      />
    );
  };

  return (
    <AccButton
      Icon={HighSaturationIcon}
      titleTranslationKey="colors.lowSaturation"
      title="Low Saturation"
      stats={isLowSaturation ? `${saturation}%` : undefined}
      styleIcon={{ transform: "rotate(180deg)" }}
      elementType={!isLowSaturation ? "button" : "div"}
      isActive={isLowSaturation}
      onToggle={!isLowSaturation ? toggleLowSaturationHandler : undefined}
    >
      {renderControlButtons()}
      {isLowSaturation && (
        <RcSlider
          range
          min={50}
          max={199}
          value={saturation}
          onChange={(e) => {
            onChangeAccState((draft) => {
              draft.lowSaturation.saturation = e as number;
            });
          }}
        />
      )}
    </AccButton>
  );
};

export default LowSaturationButton;
