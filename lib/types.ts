import {Draft} from 'immer';
export type ChangeAccDraftHander = (d: Draft<AccessibilikState>) =>void;

export interface TextAlign {
  left:string | null;
  center:string | null;
  right:string | null;
}

export interface AccessibilikState {
  language:string;
  isBlueLightFilter:boolean;
  brightness:{isBrightness:boolean,brightness:number};
  isDarkContrast:boolean;
  isLightContrast:boolean;
  highContrast:{isHighContrast:boolean,contrast:number};
  highSaturation:{isHighSaturation:boolean,saturation:number};
  lowSaturation:{isLowSaturation:boolean,saturation:number},
  isMonochrome:boolean,
  color:string,
  isVisualImpairment:boolean;
  adjustFontSizePercentage:number;
  textAlign:TextAlign;
  isDyslexiaFont:boolean;
  isFontWeightBold:boolean;
  highlightLinks:boolean;
  highlightTitles:boolean;
  letterSpacing:number;
  lineHeight:{isLineHeight:boolean,lineHeight:number};
  wordSpacing:number;
  zoom:{isZoom:boolean,zoom:number};
  isBigCursor:boolean;
  showReadingGuide:boolean;
  activateTextToSpeech:boolean;
}

export type IconSvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
  title?: string | undefined;
}>
