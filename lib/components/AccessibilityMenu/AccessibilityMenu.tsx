import { FC, useEffect, useRef, useState } from "react";
import { ACC_MENU_CONTAINER_ID } from "../../constants";
import Header from "../Header/Header";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import { produce } from "immer";
import Footer from "../Footer/Footer";
import Select from "react-select";
import styled from "./AccessibilityMenu.module.scss";
import AccMenuContent from "../AccMenuContent/AccMenuContent";
import {
  CollapsedState,
  CollapsedStateKeys,
  collapsedStateInit,
  langMap,
  langOptions,
} from "../../config";

interface AccessibilityMenuProps {
  nodeListUpdated: number;
  display: string;
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
  onLangChange: (langCode: string) => void;
  onInit: () => void;
  onShow: () => void;
  showAcc: boolean;
  hasLanguages:boolean;
}

const AccessibilityMenu: FC<AccessibilityMenuProps> = ({
  accState,
  display,
  onInit,
  onLangChange,
  onChangeAccState,
  nodeListUpdated,
  onShow,
  showAcc,
  hasLanguages
}) => {
  const [collapsedState, setCollapsedState] =
    useState<CollapsedState>(collapsedStateInit);
  const { language } = accState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>();
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  const toggleCollapseHandler = (name: CollapsedStateKeys) => {
    setCollapsedState((p) => {
      return produce(collapsedStateInit, (draft) => {
        const prevExpandedState = p[name].isExpanded;
        draft[name].isExpanded = !prevExpandedState;
      });
    });
  };

  return (
    <div id={ACC_MENU_CONTAINER_ID} className={styled.accAccessibilityMenu}>
      <div style={{ display }} className={styled.accMenu}>
        <Header onShow={onShow} onInit={onInit} />
        <Select
          className={styled["acc-lang-select-container"]}
          options={hasLanguages ? langOptions : [langOptions[0]]}
          value={langMap[language]}
          onChange={(lang) => lang && onLangChange(lang.value)}
          ref={selectRef}
        />
        <AccMenuContent
          onCollapse={toggleCollapseHandler}
          nodeListUpdated={nodeListUpdated}
          accState={accState}
          onChangeAccState={onChangeAccState}
          collapsedState={collapsedState}
        />
        <Footer />
      </div>
      {showAcc && <div className={styled.accAccessibilityMenu__overlay}></div>}
    </div>
  );
};

export default AccessibilityMenu;
