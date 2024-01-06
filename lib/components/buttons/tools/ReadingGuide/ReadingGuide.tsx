import { FC, useEffect, useMemo, useState } from "react";
import Portal from "../../../Portal/Portal";
import ReadingGuideIcon from "./../../../../assets/icons/readingGuide.svg?react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import styles from "./ReadingGuide.module.scss";

const READING_GUIDE_PORTAL_ID = "acc-portal-[readingGuide-container]";

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
  const [mouseY, setMouseY] = useState(0);
  const height = useMemo(() => {
    if (mouseY > 0) {
      return `calc(100vh - ${mouseY}px - ${rgGap}px)`;
    }
    return 0;
  }, [mouseY, rgGap]);

  useEffect(() => {
    if (showReadingGuide) {
      const handleMouseMove = (event: MouseEvent) => {
        setMouseY(event.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [showReadingGuide]);

  const toggleReadingGuideHandler = () => {
    onChangeAccState((draft) => {
      draft.showReadingGuide = !draft.showReadingGuide;
    });
  };

  const renderReadingGuide = () => {
    if (!showReadingGuide) return null;
    return (
      <Portal wrapperElementId={READING_GUIDE_PORTAL_ID}>
        <div
          className={styles["acc-readingGuide"]}
          style={{ height: mouseY }}
        ></div>
        <div
          className={styles["acc-readingGuide"]}
          style={{ top: "auto", bottom: 0, height }}
        ></div>
      </Portal>
    );
  };

  return (
    <>
      <AccButton
        Icon={ReadingGuideIcon}
        isToggled={showReadingGuide}
        onToggle={toggleReadingGuideHandler}
        titleTranslationKey="tools.readingGuide"
        title="Reading Guide"
      />
      {renderReadingGuide()}
    </>
  );
};

export default ReadingGuide;
