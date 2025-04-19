import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import Brightness4SharpIcon from './../../../../assets/icons/darkContrast.svg?react';

interface DarkContrastButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const DarkContrastButton: FC<DarkContrastButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleDarkContrastHandler = () => {
    onChangeAccState((draft) => {
      draft.isDarkContrast = !draft.isDarkContrast;
    });
  };

  return (
    <AccButton
      Icon={Brightness4SharpIcon}
      isToggled={accState.isDarkContrast}
      onToggle={toggleDarkContrastHandler}
      titleTranslationKey="colors.darkContrast"
      title="Dark Contrast"
    />
  );
};

export default DarkContrastButton;
