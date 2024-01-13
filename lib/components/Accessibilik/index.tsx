import { FC, useEffect, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
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
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import { getAccInitState } from "../../utils";
import { initReactI18next } from "react-i18next";
import {
  Resources,
  getLanguagePromises,
  languageArray,
  languages,
  rtlLanguages,
} from "./../../i18/locale";
import en from "../../i18/locale/en.json";

i18n.use(LanguageDetector).use(initReactI18next);
const ACC_LOCAL_STORAGE_KEY = 'accessibilik'

const Accessibilik: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLanguages, setHasLanguages] = useState(false);
  const isTraversing = useFontSizeTraverse();
  const nodeListUpdated = useFontSizeMutationObserver();
  const [accState, setAccState] = useSessionStorage<AccessibilikState>(
    ACC_LOCAL_STORAGE_KEY,
    getAccInitState()
  );
  const [showAcc, setShowAcc] = useState(false);
  const isGettingReady = isTraversing || isLoading;
  const direction = rtlLanguages.includes(accState.language) ? "rtl" : "ltr";

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

  useEffect(() => {
    const promises = getLanguagePromises();
    const resources: Resources = {};
    Promise.all(promises)
      .then((langs) => {
        languageArray.forEach((item, index) => {
          resources[item.lang] = {
            translation: langs[index],
          };
        });
        i18n.init({
          // debug: true,
          fallbackLng: "he-IL",
          resources,
        });
        i18n.languages = languages;
        setHasLanguages(true);
      })
      .catch((_err) => {
        i18n.init({
          fallbackLng: "en",
          resources: {
            en: {
              translation: en,
            },
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isGettingReady)
    return <AccessibilityButton showSpinner={isGettingReady} />;

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
          hasLanguages={hasLanguages}
        />
      </div>
    </Portal>
  );
};

export default Accessibilik;
