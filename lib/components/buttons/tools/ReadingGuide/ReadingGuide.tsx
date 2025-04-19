import { FC } from "react";
import ReadingGuideIcon from "./../../../../assets/icons/readingGuide.svg?react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import { useReadingGuide } from "./useReadingGuide";

interface ReadingGuideProps {
  rgGap?: number;
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}
const ReadingGuide: FC<ReadingGuideProps> = ({
  rgGap = 100,
  accState,
  onChangeAccState,
}) => {
  const { showReadingGuide } = accState;
  useReadingGuide(showReadingGuide, rgGap);

  const toggleReadingGuideHandler = () => {
    onChangeAccState((draft) => {
      draft.showReadingGuide = !draft.showReadingGuide;
    });
  };

  return (
    <AccButton
      Icon={ReadingGuideIcon}
      isToggled={showReadingGuide}
      onToggle={toggleReadingGuideHandler}
      titleTranslationKey="tools.readingGuide"
      title="Reading Guide"
    />
  );
};

export default ReadingGuide;
