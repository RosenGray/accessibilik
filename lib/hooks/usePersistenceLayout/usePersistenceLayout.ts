import { AccessibilikState } from "../../types";
import { useFontWeightButton } from "../../components/buttons/content/FontWeightButton/useFontWeightButton";
import { useAdjustFontSize } from "../../components/buttons/content/AdjustFontSize/useAdjustFontSize";
import { useAlignTextButton } from "../../components/buttons/content/AlignTextButton/useAlignTextButton";
import { useDyslexiaFontButton } from "../../components/buttons/content/DyslexiaFontButton/useDyslexiaFontButton";
import { useHighlightLinksButton } from "../../components/buttons/content/HighlightLinksButton/useHighlightLinksButton";
import { useHighlightTitlesButton } from "../../components/buttons/content/HighlightTitlesButton/useHighlightTitlesButton";
import { useLetterSpacingButton } from "../../components/buttons/content/LetterSpacingButton/useLetterSpacingButton";
import { useLineHeightButton } from "../../components/buttons/content/LineHeightButton/useLineHeightButton";
import { useWordSpacingButton } from "../../components/buttons/content/WordSpacingButton/useWordSpacingButton";
import { useZoomButton } from "../../components/buttons/content/ZoomButton/useZoomButton";
import { useBigCursorButton } from "../../components/buttons/tools/BigCursorButton/useBigCursorButton";
import { useReadingGuide } from "../../components/buttons/tools/ReadingGuide/useReadingGuide";
import { useBlueLightFilterButton } from "../../components/buttons/colors/BlueLightFilterButton/useBlueLightFilterButton";
import { useDarkContrastButton } from "../../components/buttons/colors/DarkContrastButton/useDarkContrastButton";
import { useLightContrastButton } from "../../components/buttons/colors/LightContrastButton/useLightContrastButton";
import { useVisualImpairmentButton } from "../../components/buttons/colors/VisualImpairmentButton/useVisualImpairmentButton";
import { useMonochromeButton } from "../../components/buttons/colors/MonochromeButton/useMonochromeButton";
import { useHighContrastButton } from "../../components/buttons/colors/HighContrastButton/useHighContrastButton";
import { useBrightnessControl } from "../../components/buttons/colors/BrightnessControl/useBrightnessControl";
import { useHighSaturationButton } from "../../components/buttons/colors/HighSaturationButton/useHighSaturationButton";
import { useLowSaturationButton } from "../../components/buttons/colors/LowSaturationButton/useLowSaturationButton";
import { useTextColorPickerButton } from "../../components/buttons/colors/TextColorPickerButton/useTextColorPickerButton";
interface UsePersistenceLayoutProps {
  accState: AccessibilikState;
  isGettingReady: boolean;
  nodeListUpdated: number;
}

const usePersistenceLayout = ({
  accState,
  isGettingReady,
  nodeListUpdated,
}: UsePersistenceLayoutProps) => {
  useFontWeightButton(accState.isFontWeightBold, isGettingReady);
  useAdjustFontSize(
    accState.adjustFontSizePercentage,
    nodeListUpdated,
    isGettingReady
  );
  useAlignTextButton(accState.textAlign, isGettingReady);
  useDyslexiaFontButton(accState.isDyslexiaFont, isGettingReady);
  useHighlightLinksButton(accState.highlightLinks, isGettingReady);
  useHighlightTitlesButton(accState.highlightTitles, isGettingReady);
  useLetterSpacingButton(accState.letterSpacing, isGettingReady);
  useLineHeightButton(accState.lineHeight, isGettingReady);
  useWordSpacingButton(accState.wordSpacing, isGettingReady);
  useZoomButton(accState.zoom, isGettingReady);
  useBigCursorButton(accState.isBigCursor, isGettingReady);
  useReadingGuide(accState.showReadingGuide, 100, isGettingReady);
  useBlueLightFilterButton(accState.isBlueLightFilter, isGettingReady);
  useDarkContrastButton(accState.isDarkContrast, isGettingReady);
  useLightContrastButton(accState.isLightContrast, isGettingReady);
  useVisualImpairmentButton(accState.isVisualImpairment, isGettingReady);
  useMonochromeButton(accState.isMonochrome, isGettingReady);
  useHighContrastButton(
    accState.highContrast.isHighContrast,
    accState.highContrast.contrast,
    isGettingReady
  );
  useBrightnessControl(
    accState.brightness.isBrightness,
    accState.brightness.brightness,
    isGettingReady
  );
  useHighSaturationButton(
    accState.highSaturation.isHighSaturation,
    accState.highSaturation.saturation,
    isGettingReady
  );
  useLowSaturationButton(
    accState.lowSaturation.isLowSaturation,
    accState.lowSaturation.saturation,
    isGettingReady
  );
  useTextColorPickerButton(accState.color, isGettingReady);
};

export default usePersistenceLayout;
