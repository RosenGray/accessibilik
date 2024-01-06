import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import BigCursorButton from "../buttons/tools/BigCursorButton/BigCursorButton";
import ReadingGuide from "../buttons/tools/ReadingGuide/ReadingGuide";
import TextToSpeech from "../buttons/tools/TextToSpeech/TextToSpeech";


interface AccToolsProps {
    accState: AccessibilikState;
    onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const AccTools:FC<AccToolsProps> = ({accState,onChangeAccState}) => {
    return <>
      <BigCursorButton accState={accState} onChangeAccState={onChangeAccState}/>
      <ReadingGuide accState={accState} onChangeAccState={onChangeAccState}/>
      <TextToSpeech accState={accState} onChangeAccState={onChangeAccState}/>
    </>
}
export default AccTools;