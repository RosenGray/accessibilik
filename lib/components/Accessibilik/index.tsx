import { FC, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { produce } from "immer";
import styles from "./Accessibilik.module.scss";
import AccessibilityButton from "../buttons/AccessibilityButton/AccessibilityButton";
import AccessibilityMenu from "../AccessibilityMenu/AccessibilityMenu";
import useFontSizeTraverse from "../../hooks/useFontSizeTraverse";
import useFontSizeMutationObserver from "../../hooks/useFontSizeMutationObserver";
import "../../index.css";
import { APP_ID, PORTAL_APP_ID } from "../../constants";
import LanguageDetector from "i18next-browser-languagedetector";
import Portal from "../Portal/Portal";
import i18n from "i18next";
import { ChangeAccDraftHander } from "../../types";
import { getAccInitState } from "../../utils";
import { initReactI18next } from "react-i18next";
import langResources,{languages,rtlLanguages} from './../../i18/locale';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "he-IL",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources:langResources,
  });

i18n.languages = languages;

const Accessibilik: FC = () => {
  const isTraversing = useFontSizeTraverse();
  const nodeListUpdated = useFontSizeMutationObserver();
  const [accState, setAccState] = useLocalStorage(
    "accessibilik",
    getAccInitState()
  );
  const [showAcc, setShowAcc] = useState(false);

  const direction = rtlLanguages.includes(accState.language) ? 'rtl' : 'ltr';


  const changeLanguageHandler = (langCode: string) => {
    i18n.changeLanguage(langCode, () => {
      setAccState((p) => {
        return produce(p, (draft) => {
          draft.language = langCode;
        });
      });
    });
  };
  const changeAccessibilikStateHandler = (fn: ChangeAccDraftHander) => {
    setAccState((p) => {
      return produce(p, fn);
    });
  };

  const initAccessibilikStateHandler = () => {
    setAccState(getAccInitState());
  };
  const renderAccHandler = () => {
    setShowAcc((p) => !p);
  };

  if (isTraversing) return null;

  return (
    <Portal wrapperElementId={PORTAL_APP_ID}>
      <div
        id={APP_ID}
        style={{ direction, fontSize: 50 }}
        className={styles.Accessibilik}
        data-acc-language={accState.language}
      >
        <AccessibilityButton onShow={renderAccHandler} />

        <AccessibilityMenu
          display={showAcc ? "block" : "none"}
          showAcc={showAcc}
          accState={accState}
          onLangChange={changeLanguageHandler}
          onChangeAccState={changeAccessibilikStateHandler}
          onInit={initAccessibilikStateHandler}
          nodeListUpdated={nodeListUpdated}
          onShow={renderAccHandler}
        />
      </div>
    </Portal>
  );
};

export default Accessibilik;
