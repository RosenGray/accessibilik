import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import Brightness4SharpIcon from "./../../../../assets/icons/darkContrast.svg?react";

interface LightContrastButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const LightContrastButton: FC<LightContrastButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleLightContrastHandler = () => {
    onChangeAccState((draft) => {
      draft.isLightContrast = !draft.isLightContrast;
    });
  };

  return (
    <AccButton
      Icon={Brightness4SharpIcon}
      isToggled={accState.isLightContrast}
      onToggle={toggleLightContrastHandler}
      titleTranslationKey="colors.lightContrast"
      title="Light Contrast"
    />
  );
};

export default LightContrastButton;
