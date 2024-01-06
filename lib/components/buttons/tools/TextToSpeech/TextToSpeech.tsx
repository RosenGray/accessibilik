import { FC, useEffect, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import TextToSpeachIcon from "./../../../../assets/icons/textToSpeach.svg?react";
import styled from "./TextToSpeech.module.scss";

const NOT_SUPPORT_MSG = "Sorry, your browser does not support text-to-speech!";

interface TextToSpeechProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}
type SpeechSynthesisVoceMap = Record<string, SpeechSynthesisVoice>; //{ [key: string]: SpeechSynthesisVoice };

const TextToSpeech: FC<TextToSpeechProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { activateTextToSpeech, language } = accState;
  const [browserHasSupport, setBrowserHasSupport] = useState(false);
  const [gettingLanguages, setIsGettingLanguages] = useState(true);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const voices = useRef<SpeechSynthesisVoice[] | null>(null);

  useEffect(() => {
    if (!activateTextToSpeech) return;
    if (!window.speechSynthesis) {
      alert(NOT_SUPPORT_MSG);
      return;
    }

    const timer = setTimeout(() => {
      if (!voices.current) {
        const _voices = window.speechSynthesis.getVoices();
        const languages = _voices.reduce((acc, item) => {
          acc[item.lang] = item;
          return acc;
        }, {} as SpeechSynthesisVoceMap);

        voices.current = Object.values(languages);
      }
      const voice =
        voices.current.find((v) => v.lang.includes(language)) ??
        voices.current[0];

      setVoice(voice);
      setBrowserHasSupport(true);
      setIsGettingLanguages(false);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activateTextToSpeech]);

  useEffect(() => {
    if (!activateTextToSpeech) return;
    if (browserHasSupport && !gettingLanguages) {
      const handleTextSelection = () => {
        const selection = window.getSelection();

        if (selection) {
          const text = selection.toString();
          if (text) {
            speakText(text);
          }
        }
      };

      const speakText = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);

        if (voice) {
          utterance.voice = voice;
        }

        window.speechSynthesis.speak(utterance);
      };

      document.addEventListener("mouseup", handleTextSelection);
      return () => {
        document.removeEventListener("mouseup", handleTextSelection);
      };
    }
  }, [activateTextToSpeech, browserHasSupport, gettingLanguages, voice]);

  const selectVoiceHandler = (v: SingleValue<SpeechSynthesisVoice>) => {
    setVoice(v);
  };

  const toggleTextToSpeecHandler = () => {
    onChangeAccState((draft) => {
      draft.activateTextToSpeech = !draft.activateTextToSpeech;
    });
  };

  const renderLangVoices = () => {
    if (!activateTextToSpeech) return null;
    if (gettingLanguages) return <p style={{ color: "red" }}>...lading</p>;
    if (!browserHasSupport || !voices.current) {
      return <p style={{ color: "red" }}>{NOT_SUPPORT_MSG}</p>;
    }

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Select
          className={styled.accSelectVoicesContainer}
          classNamePrefix="accSelectVoices"
          options={voices.current}
          value={voice}
          onChange={selectVoiceHandler}
          getOptionLabel={(option) => option.lang}
          getOptionValue={(option) => option.lang}
        />
      </div>
    );
  };
  return (
    <AccButton
      Icon={TextToSpeachIcon}
      isToggled={activateTextToSpeech}
      onToggle={toggleTextToSpeecHandler}
      titleTranslationKey="tools.textToSpeach"
      title="Text To Speach"
      tooltipTranslationKey="tools.textToSpeachTooltip"
    >
      {renderLangVoices()}
    </AccButton>
  );
};

export default TextToSpeech;
