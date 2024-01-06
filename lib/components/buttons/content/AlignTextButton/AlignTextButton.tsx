import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import FormatAlignCenterIcon from "./../../../../assets/icons/textAlign.svg?react";
import { PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-align-text-style";
const rootClass = "acc-align-text";
type Direction = "right" | "center" | "left";

interface AlignTextButtonProps {
  direction: Direction;
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
  translationKey:string;
}

const AlignTextButton: FC<AlignTextButtonProps> = ({
  direction,
  accState,
  onChangeAccState,
  translationKey
}) => {
  const { textAlign } = accState;
  const dir = textAlign[direction];
  const isToggled = !!dir;

  const alignHandler = () => {
    onChangeAccState((d) => {
      const prevDirection = d.textAlign[direction]
      d.textAlign[direction] = !prevDirection ? direction : null;
    });
  };

  useLayoutEffect(() => {
    if (dir) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  html.${rootClass} *:not(#${PORTAL_APP_ID} *), *:not(#${PORTAL_APP_ID} *)  {
                  text-align:${dir} !important
                }
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [dir,direction]);

  return (
    <AccButton
      Icon={FormatAlignCenterIcon}
      isToggled={isToggled}
      onToggle={alignHandler}
      titleTranslationKey={translationKey}
      title="Text Align"
    />
  );
};

export default AlignTextButton;
