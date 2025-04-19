import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import AdjustFontSize from "../buttons/content/AdjustFontSize/AdjustFontSize";
import DyslexiaFontButton from "../buttons/content/DyslexiaFontButton/DyslexiaFontButton";
import FontWeightButton from "../buttons/content/FontWeightButton/FontWeightButton";
import AlignTextButton from "../buttons/content/AlignTextButton/AlignTextButton";
import HighlightLinksButton from "../buttons/content/HighlightLinksButton/HighlightLinksButton";
import HighlightTitlesButton from "../buttons/content/HighlightTitlesButton/HighlightTitlesButton";
import LetterSpacingButton from "../buttons/content/LetterSpacingButton/LetterSpacingButton";
import WordSpacingButton from "../buttons/content/WordSpacingButton/WordSpacingButton";
import LineHeightButton from "../buttons/content/LineHeightButton/LineHeightButton";

import ZoomButton from "../buttons/content/ZoomButton/ZoomButton";

interface AccContentProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}
const AccContent: FC<AccContentProps> = ({ accState, onChangeAccState }) => {
  return (
    <>
      <AdjustFontSize accState={accState} onChangeAccState={onChangeAccState} />
      <DyslexiaFontButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <FontWeightButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <AlignTextButton
        accState={accState}
        onChangeAccState={onChangeAccState}
        direction="left"
        translationKey="content.textAlignLeft"
      />
      <AlignTextButton
        accState={accState}
        onChangeAccState={onChangeAccState}
        direction="center"
        translationKey="content.textAlignCenter"
      />
      <AlignTextButton
        accState={accState}
        onChangeAccState={onChangeAccState}
        direction="right"
        translationKey="content.textAlignRight"
      />
      <HighlightLinksButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <HighlightTitlesButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <LetterSpacingButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <WordSpacingButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />
      <LineHeightButton
        accState={accState}
        onChangeAccState={onChangeAccState}
      />

      <ZoomButton accState={accState} onChangeAccState={onChangeAccState} />
    </>
  );
};
export default AccContent;
