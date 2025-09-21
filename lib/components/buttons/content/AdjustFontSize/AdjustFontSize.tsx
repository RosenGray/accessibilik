import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import TextIncreaseIcon from "./../../../../assets/icons/adjustFontSize.svg?react";
import AccValueControl from "../../AccValueControl/AccValueControl";

interface AdjustFontSizeProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const AdjustFontSize: FC<AdjustFontSizeProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { adjustFontSizePercentage } = accState;

  const increaseFontSizeHandler = () => {
    onChangeAccState((draft) => {
      const { adjustFontSizePercentage } = draft;
      if (adjustFontSizePercentage < 200) {
        draft.adjustFontSizePercentage += 10;
      }
    });
  };
  const decreaseFontSizeHandler = () => {
    onChangeAccState((draft) => {
      const { adjustFontSizePercentage } = draft;
      if (adjustFontSizePercentage > 10) {
        draft.adjustFontSizePercentage -= 10;
      }
    });
  };
  const initFontSizeHandler = () => {
    onChangeAccState((draft) => {
      draft.adjustFontSizePercentage = 100;
    });
  };

  return (
    <AccButton
      elementType="div"
      Icon={TextIncreaseIcon}
      titleTranslationKey={"content.adjustFontSize"}
      title="Adjust Font Size"
      stats={`${adjustFontSizePercentage}%`}
    >
      <AccValueControl
        onIncrease={increaseFontSizeHandler}
        onToggle={initFontSizeHandler}
        onDescrease={decreaseFontSizeHandler}
      />
    </AccButton>
  );
};

export default AdjustFontSize;
