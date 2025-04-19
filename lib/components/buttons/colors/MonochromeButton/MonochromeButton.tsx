import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import MonochromePhotosIcon from "./../../../../assets/icons/monochrome.svg?react";

interface MonochromeButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const MonochromeButton: FC<MonochromeButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleMonochromeHandler = () => {
    onChangeAccState((draft) => {
      draft.isMonochrome = !draft.isMonochrome;
    });
  };

  return (
    <AccButton
      Icon={MonochromePhotosIcon}
      isToggled={accState.isMonochrome}
      onToggle={toggleMonochromeHandler}
      titleTranslationKey="colors.monochrom"
      title="Monochrom"
    />
  );
};

export default MonochromeButton;
