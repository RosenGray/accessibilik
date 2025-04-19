import { useEffect, useMemo, useState } from "react";
const READING_GUIDE_PORTAL_ID = "acc-portal-[readingGuide-container]";

const renderReadingGuide = (mouseY: number, height: string | 0) => {
  const readingGuideContainer = document.getElementById(
    READING_GUIDE_PORTAL_ID
  )!;

  let readingGuideTop = document.getElementById("acc-readingGuide-top");
  if (!readingGuideTop) {
    readingGuideTop = document.createElement("div");
    readingGuideTop.id = "acc-readingGuide-top";
    readingGuideTop.className = "acc-readingGuide";
    readingGuideTop.style.height = `${mouseY}px`;
    readingGuideContainer.appendChild(readingGuideTop);
  }
  readingGuideTop.style.height = `${mouseY}px`;

  let readingGuideBottom = document.getElementById("acc-readingGuide-bottom");
  if (!readingGuideBottom) {
    readingGuideBottom = document.createElement("div");
    readingGuideBottom.id = "acc-readingGuide-bottom";
    readingGuideBottom.className = "acc-readingGuide";
    readingGuideBottom.style.top = "auto";
    readingGuideBottom.style.bottom = "0";
    readingGuideBottom.style.height = `${height}`;
    readingGuideContainer.appendChild(readingGuideBottom);
  }
  readingGuideBottom.style.height = `${height}`;
};

export const useReadingGuide = (
  showReadingGuide: boolean,
  rgGap: number,
  isGettingReady?: boolean
) => {
  const [mouseY, setMouseY] = useState(0);
  const height = useMemo(() => {
    if (mouseY > 0) {
      return `calc(100vh - ${mouseY}px - ${rgGap}px)`;
    }
    return 0;
  }, [mouseY, rgGap]);

  useEffect(() => {
    if (isGettingReady) return;
    if (showReadingGuide) {
      const handleMouseMove = (event: MouseEvent) => {
        setMouseY(event.clientY);
      };
      renderReadingGuide(mouseY, height);
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      const readingGuideTop = document.getElementById("acc-readingGuide-top");
      if (readingGuideTop) {
        readingGuideTop.remove();
      }
      const readingGuideBottom = document.getElementById(
        "acc-readingGuide-bottom"
      );
      if (readingGuideBottom) {
        readingGuideBottom.remove();
      }
    }
  }, [showReadingGuide, isGettingReady, mouseY, height]);
};
