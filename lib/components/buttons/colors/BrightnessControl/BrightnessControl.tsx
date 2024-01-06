import { FC, useLayoutEffect } from "react";
import styled from "./BrightnessControl.module.scss";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import LightModeSharpIcon from "./../../../../assets/icons/brightness.svg?react";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";
import RcSlider from "../../../RcSlider/RcSlider";

const styleID = "acc-brightness-control-style";
const rootClass = "acc-brightness-control";

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
  const initBrightnessHandler = () => {
    onChangeAccState((draft) => {
      const isActive = !draft.brightness.isBrightness;
      draft.brightness.isBrightness = isActive;
      draft.brightness.brightness = isActive ? 150 : 0;
    });
  };

  useLayoutEffect(() => {
    if (isBrightness) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: brightness(${brightness}%) !important;
                    -ms-filter: brightness(${brightness}%) !important;
                    -moz-filter: brightness(${brightness}%) !important;
                    -webkit-filter: brightness(${brightness}%) !important;
                    filter: brightness(${brightness}%) !important;
                }
            `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isBrightness, brightness]);

  return (
    <AccButton
      Icon={LightModeSharpIcon}
      titleTranslationKey="colors.brightnessControl"
      elementType="div"
      title="Brightness Control"
      stats={isBrightness ? `${brightness}%` :undefined}
    >
      <div className={styled.accBrightnessControl}>
        {isBrightness && (
          <AccValueControlButton
            onClick={increaseBrightnessHandler}
            controlType="increase"
          />
        )}
        <AccValueControlButton
          onClick={initBrightnessHandler}
          controlType="init"
        />

        {isBrightness && (
          <AccValueControlButton
            onClick={decreaseBrightnessHandler}
            controlType="decrease"
          />
        )}
      </div>
      {isBrightness && (
        <RcSlider
          // vertical
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
