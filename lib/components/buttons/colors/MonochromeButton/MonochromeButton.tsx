import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import MonochromePhotosIcon from "./../../../../assets/icons/monochrome.svg?react";

const styleID = "acc-monochrome-style";
const rootClass = "acc-monochrome";

interface MonochromeButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const MonochromeButton: FC<MonochromeButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isMonochrome } = accState;
  const toggleMonochromeHandler = () => {
    onChangeAccState((draft) => {
      draft.isMonochrome = !draft.isMonochrome;
    });
  };

  useLayoutEffect(() => {
    if (isMonochrome) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: grayscale(100%) !important;
                    -ms-filter: grayscale(100%) !important;
                    -moz-filter: grayscale(100%) !important;
                    -webkit-filter: grayscale(100%) !important;
                    filter: grayscale(100%) !important;
                }
            `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isMonochrome]);

  return (
    <AccButton
      Icon={MonochromePhotosIcon}
      isToggled={isMonochrome}
      onToggle={toggleMonochromeHandler}
      titleTranslationKey="colors.monochrom"
      title="Monochrom"
    />
  );
};

export default MonochromeButton;
