import { FC } from "react";
import VisibilitySharpIcon from "./../../../../assets/icons/blueLight.svg?react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";

interface BlueLightFilterButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const BlueLightFilterButton: FC<BlueLightFilterButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isBlueLightFilter } = accState;

  const toggleBlueLightFilter = () => {
    onChangeAccState((draft) => {
      draft.isBlueLightFilter = !draft.isBlueLightFilter;
    });
  };

  return (
    <AccButton
      Icon={VisibilitySharpIcon}
      isToggled={isBlueLightFilter}
      onToggle={toggleBlueLightFilter}
      titleTranslationKey="colors.blueLightFilter"
      title="Blue Light Filter"
    />
  );
};

export default BlueLightFilterButton;
