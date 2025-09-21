import { FC } from "react";
import styled from "./BrightnessControl.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import LightModeSharpIcon from "./../../../../assets/icons/brightness.svg?react";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";
import RcSlider from "../../../RcSlider/RcSlider";

interface BrightnessControlProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const BrightnessControl: FC<BrightnessControlProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isBrightness, brightness } = accState.brightness;

  const increaseBrightnessHandler = () => {
    onChangeAccState((draft) => {
      const { brightness } = draft;
      if (brightness.brightness < 500) {
        draft.brightness.brightness++;
      }
    });
  };
  const decreaseBrightnessHandler = () => {
    onChangeAccState((draft) => {
      const { brightness } = draft;
      if (brightness.brightness > 100) {
        draft.brightness.brightness--;
      }
    });
  };
  const toggleBrightnessHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.brightness.isBrightness;
      draft.brightness.isBrightness = isActive;
      draft.brightness.brightness = isActive ? 150 : 0;
    });
  };

  const renderControlButtons = () => {
    if (!isBrightness) return null;
    return (
      <div className={styled.accBrightnessControl}>
        <AccValueControlButton
          onClick={increaseBrightnessHandler}
          controlType="increase"
        />

        <AccValueControlButton
          onClick={toggleBrightnessHandler}
          controlType="init"
        />

        <AccValueControlButton
          onClick={decreaseBrightnessHandler}
          controlType="decrease"
        />
      </div>
    );
  };

  return (
    <AccButton
      Icon={LightModeSharpIcon}
      titleTranslationKey="colors.brightnessControl"
      title="Brightness Control"
      elementType={!isBrightness ? "button" : "div"}
      isActive={isBrightness}
      onToggle={!isBrightness ? toggleBrightnessHandler : undefined}
      stats={isBrightness ? `${brightness}%` : undefined}
    >
      {renderControlButtons()}
      {isBrightness && (
        <RcSlider
          range
          min={150}
          max={500}
          value={brightness}
          onChange={(e) => {
            onChangeAccState((draft) => {
              draft.brightness.brightness = e as number;
            });
          }}
        />
      )}
    </AccButton>
  );
};

export default BrightnessControl;
