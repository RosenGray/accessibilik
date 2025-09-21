import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import TitleIcon from "./../../../../assets/icons/highlightTitles.svg?react";
import AccButton from "../../AccButton/AccButton";
interface HighlightTitlesButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HighlightTitlesButton: FC<HighlightTitlesButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { highlightTitles } = accState;
  const toggleHighlightHander = () => {
    onChangeAccState((draft) => {
      draft.highlightTitles = !draft.highlightTitles;
    });
  };

  return (
    <AccButton
      Icon={TitleIcon}
      isToggled={highlightTitles}
      onToggle={toggleHighlightHander}
      titleTranslationKey="content.highlightTitles"
      title="Highlight Titles"
    />
  );
};

export default HighlightTitlesButton;
