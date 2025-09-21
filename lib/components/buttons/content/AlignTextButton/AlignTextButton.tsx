import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import FormatAlignCenterIcon from "./../../../../assets/icons/textAlign.svg?react";

import React from "react";

type Direction = "right" | "center" | "left";

interface AlignTextButtonProps {
  direction: Direction;
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
  translationKey: string;
}

const AlignTextButton: FC<AlignTextButtonProps> = ({
  direction,
  accState,
  onChangeAccState,
  translationKey,
}) => {
  const { textAlign } = accState;
  const isToggled = !!textAlign[direction];

  const alignHandler = () => {
    onChangeAccState((d) => {
      const prevDirection = d.textAlign[direction];
      d.textAlign[direction] = !prevDirection ? direction : null;
    });
  };

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

export default React.memo(AlignTextButton);
