import { FC, useLayoutEffect, useMemo } from "react";
import { textTags } from "../../../../constants";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import Brightness4SharpIcon from './../../../../assets/icons/darkContrast.svg?react';

const styleID = "acc-dark-contrast-style";
const rootClass = "acc-dark-contrast"

interface DarkContrastButtonProps {
  accState:AccessibilikState
  onChangeAccState:(fn:ChangeAccDraftHander) => void;
}


const DarkContrastButton: FC<DarkContrastButtonProps> = ({accState,onChangeAccState}) => {

  const textSelectors = useMemo(() => {
    return textTags.reduce((acc,tag,index) => {
      const lastIndex = textTags.length - 1;
      const HTML = `html.${rootClass}`;
      const delimiter = index === lastIndex ? '' : ',';
      return acc += `${HTML} ${tag}${delimiter}`;
    },'')
  },[]);

  const toggleDarkContrastHandler = () => {
    onChangeAccState(draft => {
      draft.isDarkContrast = !draft.isDarkContrast;
    })
  };

  useLayoutEffect(() => {
    if (accState.isDarkContrast) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  ${textSelectors},${textTags.join(',')} {
                  color:#FFF !important;
                  fill: #FFF !important;
                  background-color: #000 !important;
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass)
      style?.remove();
    }
  }, [accState.isDarkContrast,textSelectors]);

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
