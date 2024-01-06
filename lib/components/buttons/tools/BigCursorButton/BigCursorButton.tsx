import { FC, useLayoutEffect } from "react";
import cursor from "./cursor";
import { getDataImageSvgBase64 } from "../../../../utils";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import BigCursorIcon from "./../../../../assets/icons/bigCursor.svg?react";

const styleID = "acc-big-cursor-style";
const rootClass = "acc-big-cursor";

interface BigCursorButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const BigCursorButton: FC<BigCursorButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isBigCursor } = accState;

  const toggleBigCursorHandler = () => {
    onChangeAccState((draft) => {
      draft.isBigCursor = !draft.isBigCursor;
    });
  };

  useLayoutEffect(() => {
    if (isBigCursor) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                   html.${rootClass}  body * {
                    cursor:url(${getDataImageSvgBase64(
                      cursor
                    )}),default !important;}
            `;
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isBigCursor]);

  return (
    <AccButton
      Icon={BigCursorIcon}
      isToggled={isBigCursor}
      onToggle={toggleBigCursorHandler}
      titleTranslationKey="tools.bigCursor"
      title="Big Cursor"
    />
  );
};

export default BigCursorButton;
