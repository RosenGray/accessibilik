import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import SortByAlphaIcon from "./../../../../assets/icons/dyslexia.svg?react";
import { useDyslexiaFontButton } from "./useDyslexiaFontButton";

interface DyslexiaFontButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const DyslexiaFontButton: FC<DyslexiaFontButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isDyslexiaFont } = accState;
  useDyslexiaFontButton(isDyslexiaFont);
  const toogleDyslexiaFontHandler = () => {
    onChangeAccState((draft) => {
      draft.isDyslexiaFont = !draft.isDyslexiaFont;
    });
  };

  return (
    <AccButton
      Icon={SortByAlphaIcon}
      isToggled={isDyslexiaFont}
      onToggle={toogleDyslexiaFontHandler}
      titleTranslationKey="content.dyslexiaFont"
      title="Dyslexia Font"
    />
  );
};

export default DyslexiaFontButton;
