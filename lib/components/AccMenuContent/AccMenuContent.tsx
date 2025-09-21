import { FC } from "react";
import AccMenuContentBlock from "../AccMenuContentBlock/AccMenuContentBlock";
import AccContent from "../AccContent/AccContent";
import AccColors from "../AccColors/AccColors";
import AccTools from "../AccTools/AccTools";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import styled from "./AccMenuContent.module.scss";
import { CollapsedState, CollapsedStateKeys } from "../../config";

interface AccMenuContentProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
  onCollapse: (name: CollapsedStateKeys) => void;
  collapsedState: CollapsedState;
}
const AccMenuContent: FC<AccMenuContentProps> = ({
  accState,
  onChangeAccState,
  onCollapse,
  collapsedState,
}) => {
  const isAccMenuContentNotActive = Object.values(collapsedState).every(
    ({ isExpanded }) => !isExpanded
  );

  return (
    <div className={styled.accMenuContent}>
      <AccMenuContentBlock
        isAccMenuContentActive={!isAccMenuContentNotActive}
        onCollapse={onCollapse}
        isExpanded={collapsedState.content.isExpanded}
        name={collapsedState.content.name as CollapsedStateKeys}
        Icon={collapsedState.content.icon}
        tKey="content.title"
      >
        <AccContent accState={accState} onChangeAccState={onChangeAccState} />
      </AccMenuContentBlock>
      <AccMenuContentBlock
        isAccMenuContentActive={!isAccMenuContentNotActive}
        onCollapse={onCollapse}
        isExpanded={collapsedState.colors.isExpanded}
        name={collapsedState.colors.name as CollapsedStateKeys}
        Icon={collapsedState.colors.icon}
        tKey="colors.title"
      >
        <AccColors accState={accState} onChangeAccState={onChangeAccState} />
      </AccMenuContentBlock>
      <AccMenuContentBlock
        isAccMenuContentActive={!isAccMenuContentNotActive}
        onCollapse={onCollapse}
        isExpanded={collapsedState.tools.isExpanded}
        name={collapsedState.tools.name as CollapsedStateKeys}
        Icon={collapsedState.tools.icon}
        tKey="tools.title"
      >
        <AccTools accState={accState} onChangeAccState={onChangeAccState} />
      </AccMenuContentBlock>
    </div>
  );
};

export default AccMenuContent;
