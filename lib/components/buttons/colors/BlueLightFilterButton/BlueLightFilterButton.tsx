import { FC, useLayoutEffect } from "react";
import VisibilitySharpIcon from './../../../../assets/icons/blueLight.svg?react';
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";



const styleID = "acc-blueLight-filter-style";
const rootClass = "acc-blue-light-filter"

interface BlueLightFilterButtonProps {
  accState:AccessibilikState;
  onChangeAccState:(fn:ChangeAccDraftHander) => void;
}



const BlueLightFilterButton: FC<BlueLightFilterButtonProps> = ({accState,onChangeAccState}) => {
  const {isBlueLightFilter} = accState;
  const toggleBlutLightFilter = () => {
    onChangeAccState((draft) => {
      draft.isBlueLightFilter = !draft.isBlueLightFilter;
    })
  };

  useLayoutEffect(() => {
    if (isBlueLightFilter) {
      document.documentElement.classList.add(rootClass)
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: sepia(80%) !important;
                    -ms-filter: sepia(80%) !important;
                    -moz-filter: sepia(80%) !important;
                    -webkit-filter: sepia(80%) !important;
                    filter: sepia(80%) !important;
                }
            `;
      document.head.appendChild(style);
    } 
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass)
      style?.remove();
    }
  }, [isBlueLightFilter]);

  return (
    <AccButton
      Icon={VisibilitySharpIcon}
      isToggled={isBlueLightFilter}
      onToggle={toggleBlutLightFilter}
      titleTranslationKey="colors.blueLightFilter"
      title="Blue Light Filter"
    />
  );
};

export default BlueLightFilterButton;
