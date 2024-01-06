import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import BlueLightFilterButton from "../buttons/colors/BlueLightFilterButton/BlueLightFilterButton";
import BrightnessControl from "../buttons/colors/BrightnessControl/BrightnessControl";
import DarkContrastButton from "../buttons/colors/DarkContrastButton/DarkContrastButton";
import HighContrastButton from "../buttons/colors/HighContrastButton/HighContrastButton";
import HighSaturationButton from "../buttons/colors/HighSaturationButton/HighSaturationButton";
import LightContrastButton from "../buttons/colors/LightContrastButton/LightContrastButton";
import LowSaturationButton from "../buttons/colors/LowSaturationButton/LowSaturationButton";
import MonochromeButton from "../buttons/colors/MonochromeButton/MonochromeButton";
import TextColorPickerButton from "../buttons/colors/TextColorPickerButton/TextColorPickerButton";
import VisualImpairmentButton from "../buttons/colors/VisualImpairmentButton/VisualImpairmentButton";

interface AccColorsProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const AccColors: FC<AccColorsProps> = ({ accState, onChangeAccState }) => {
  return (
    <>
      <BlueLightFilterButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <LightContrastButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <DarkContrastButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <HighContrastButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <BrightnessControl
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <HighSaturationButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <LowSaturationButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <MonochromeButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />

      <VisualImpairmentButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <TextColorPickerButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
    </>
  );
};
export default AccColors;
