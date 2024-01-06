import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import FormatBoldIcon from "./../../../../assets/icons/fontWeight.svg?react";
import AccButton from "../../AccButton/AccButton";

const styleID = "acc-font-weight-style";
const rootClass = "acc-font-weight";

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

  useLayoutEffect(() => {
    if (isFontWeightBold) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  html.${rootClass} *, *  {
                  font-weight:700 !important;
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isFontWeightBold]);

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
