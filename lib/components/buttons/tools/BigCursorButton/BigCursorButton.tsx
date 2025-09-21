import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import BigCursorIcon from "./../../../../assets/icons/bigCursor.svg?react";
import { useBigCursorButton } from "./useBigCursorButton";

interface BigCursorButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const BigCursorButton: FC<BigCursorButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { isBigCursor } = accState;
  useBigCursorButton(isBigCursor);

  const toggleBigCursorHandler = () => {
    onChangeAccState((draft) => {
      draft.isBigCursor = !draft.isBigCursor;
    });
  };

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
