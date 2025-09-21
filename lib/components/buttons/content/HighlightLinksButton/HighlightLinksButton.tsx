import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import LinkIcon from "./../../../../assets/icons/highlightLinks.svg?react";
import AccButton from "../../AccButton/AccButton";
interface HighlightLinksButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HighlightLinksButton: FC<HighlightLinksButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { highlightLinks } = accState;
  const toggleHighlightHander = () => {
    onChangeAccState((draft) => {
      draft.highlightLinks = !draft.highlightLinks;
    });
  };

  return (
    <AccButton
      Icon={LinkIcon}
      isToggled={highlightLinks}
      onToggle={toggleHighlightHander}
      titleTranslationKey="content.highlightLinks"
      title="Highlight Links"
    />
  );
};

export default HighlightLinksButton;
