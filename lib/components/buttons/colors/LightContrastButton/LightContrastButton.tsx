import { FC, useLayoutEffect, useMemo } from "react";
import { textTags } from "../../../../constants";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import Brightness4SharpIcon from "./../../../../assets/icons/darkContrast.svg?react";
import AccButton from "../../AccButton/AccButton";

const styleID = "acc-light-contrast-style";
const rootClass = "acc-light-contrast";

interface LightContrastButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const LightContrastButton: FC<LightContrastButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1;
      const HTML = `html.${rootClass}`;
      const delimiter = index === lastIndex ? "" : ",";
      return (acc += `${HTML} ${tag}${delimiter}`);
    }, "");
  }, []);

  const toggleLightContrastHandler = () => {
    onChangeAccState((draft) => {
      draft.isLightContrast = !draft.isLightContrast;
    });
  };

  useLayoutEffect(() => {
    if (accState.isLightContrast) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  ${textSelectors},${textTags.join(",")} {
                  color:#000 !important;
                  fill: #000 !important;
                  background-color: #FFF !important;
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [accState.isLightContrast, textSelectors]);

  return (
    <AccButton
      Icon={Brightness4SharpIcon}
      isToggled={accState.isDarkContrast}
      onToggle={toggleLightContrastHandler}
      titleTranslationKey="colors.lightContrast"
      title="Light Contrast"
    />
  );
};

export default LightContrastButton;
