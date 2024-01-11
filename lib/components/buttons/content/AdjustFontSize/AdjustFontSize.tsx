import { FC, useLayoutEffect } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import TextIncreaseIcon from "./../../../../assets/icons/adjustFontSize.svg?react";
import AccValueControl from "../../AccValueControl/AccValueControl";

const getNodesByDataAttrAndAdjustFontSize = (
  dataAttr: string,
  percentage: number
) => {
  const elements = document.querySelectorAll(`[${dataAttr}]`);
  elements.forEach((elem) => {
    if (elem && elem instanceof HTMLElement && elem.dataset.accOrgfontsize) {
      const prevFontSize = +elem.dataset.accOrgfontsize;
      const newFontSize = (prevFontSize * percentage) / 100;
      elem.style.fontSize = `${newFontSize}px`;
    }
  });
};

interface AdjustFontSizeProps {
  nodeListUpdated: number;
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const AdjustFontSize: FC<AdjustFontSizeProps> = ({
  nodeListUpdated,
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

  useLayoutEffect(() => {
    if (nodeListUpdated > 0) {
      getNodesByDataAttrAndAdjustFontSize(
        "data-acc-mutation",
        adjustFontSizePercentage
      );
    }
  }, [adjustFontSizePercentage, nodeListUpdated]);

  useLayoutEffect(() => {
    getNodesByDataAttrAndAdjustFontSize(
      "data-acc-orgfontsize",
      adjustFontSizePercentage
    );
  }, [adjustFontSizePercentage]);

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
