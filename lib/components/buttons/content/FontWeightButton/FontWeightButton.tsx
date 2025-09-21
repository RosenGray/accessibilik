import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import FormatBoldIcon from "./../../../../assets/icons/fontWeight.svg?react";
import AccButton from "../../AccButton/AccButton";

interface FontWeightButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const FontWeightButton: FC<FontWeightButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isFontWeightBold } = accState;

  const toggleFontWeightHandler = () => {
    onChangeAccState((draft) => {
      draft.isFontWeightBold = !draft.isFontWeightBold;
    });
  };

  return (
    <AccButton
      Icon={FormatBoldIcon}
      isToggled={isFontWeightBold}
      onToggle={toggleFontWeightHandler}
      titleTranslationKey="content.fontWeight"
      title="Font Weight"
    />
  );
};

export default FontWeightButton;
