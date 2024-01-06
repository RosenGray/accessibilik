import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import BlindIcon from "./../../../../assets/icons/visualImpairment.svg?react";
import AccButton from "../../AccButton/AccButton";

const styleID = "acc-visual-impairment-style";
const rootClass = "acc-visual-impairment";

interface VisualImpairmentButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const VisualImpairmentButton: FC<VisualImpairmentButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isVisualImpairment } = accState;
  const toggleVisuality = () => {
    onChangeAccState((draft) => {
      draft.isVisualImpairment = !draft.isVisualImpairment;
    });
  };

  useLayoutEffect(() => {
    if (isVisualImpairment) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass} {
                    -o-filter: invert(100%) !important;
                    -ms-filter: invert(100%) !important;
                    -moz-filter: invert(100%) !important;
                    -webkit-filter: invert(100%) !important;
                    filter: invert(100%) !important;
                }
            `;
      document.head.appendChild(style);
    } else {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    }
  }, [isVisualImpairment]);

  return (
    <AccButton
      Icon={BlindIcon}
      isToggled={isVisualImpairment}
      onToggle={toggleVisuality}
      titleTranslationKey="colors.visualImpairment"
      title="Visual Impairment"
    />
  );
};

export default VisualImpairmentButton;
