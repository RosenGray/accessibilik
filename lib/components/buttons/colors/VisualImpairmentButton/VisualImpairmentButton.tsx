import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import BlindIcon from "./../../../../assets/icons/visualImpairment.svg?react";
import AccButton from "../../AccButton/AccButton";

interface VisualImpairmentButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const VisualImpairmentButton: FC<VisualImpairmentButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleVisuality = () => {
    onChangeAccState((draft) => {
      draft.isVisualImpairment = !draft.isVisualImpairment;
    });
  };

  return (
    <AccButton
      Icon={BlindIcon}
      isToggled={accState.isVisualImpairment}
      onToggle={toggleVisuality}
      titleTranslationKey="colors.visualImpairment"
      title="Visual Impairment"
    />
  );
};

export default VisualImpairmentButton;
