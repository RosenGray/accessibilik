import { FC, useLayoutEffect } from "react";
import DYSLEXIA_FONT_STYLE from "./style";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import SortByAlphaIcon from "./../../../../assets/icons/dyslexia.svg?react";

const styleID = "acc-dyslexia-font-style";
const rootClass = "acc-dyslexia-font";

interface DyslexiaFontButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const DyslexiaFontButton: FC<DyslexiaFontButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isDyslexiaFont } = accState;

  const toogleDyslexiaFontHandler = () => {
    onChangeAccState((draft) => {
      draft.isDyslexiaFont = !draft.isDyslexiaFont;
    });
  };

  useLayoutEffect(() => {
    if (isDyslexiaFont) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = DYSLEXIA_FONT_STYLE;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isDyslexiaFont]);
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
