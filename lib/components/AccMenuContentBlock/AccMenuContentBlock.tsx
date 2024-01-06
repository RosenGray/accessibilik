import { FC, ReactNode } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconSvgComponent } from "../../types";
import ExpandIcon from "./../../assets/icons/expand.svg?react";
import styles from "./AccMenuContentBlock.module.scss";
import { CollapsedStateKeys } from "../../config";

interface AccMenuContentBlockProps {
  children: ReactNode;
  name: CollapsedStateKeys;
  onCollapse: (name: CollapsedStateKeys) => void;
  isExpanded: boolean;
  isAccMenuContentActive: boolean;
  Icon: IconSvgComponent;
  tKey: string;
}
const AccMenuContentBlock: FC<AccMenuContentBlockProps> = ({
  children,
  name,
  onCollapse,
  isExpanded,
  Icon,
  tKey,
  isAccMenuContentActive,
}) => {
  const { t } = useTranslation();
  const classes = classNames(styles.accMenuContentBlock, {
    [styles.isExpanded]: isExpanded,
    [styles.isAccMenuContentActive]: isAccMenuContentActive,
  });
  const expandBlockHandler = () => {
    onCollapse(name);
  };
  const role = !isExpanded ? "button" : undefined;
  const tabIndex = !isExpanded ? 0 : undefined;

  return (
    <div
      onClick={!isExpanded ? expandBlockHandler : undefined}
      role={role}
      className={classes}
      tabIndex={tabIndex}
    >
      {isExpanded && (
        <div className={styles.accMenuContentBlock__expendButtonContainer}>
          <button onClick={expandBlockHandler}>
            <ExpandIcon/>
          </button>
        </div>
      )}
      {!isExpanded && (
        <div className={styles.accMenuContentBlock__titleContainer}>
          <Icon />
          <h3 className={styles.accMenuContentBlock__title}>{t(tKey)}</h3>
        </div>
      )}
      {isExpanded && (
        <div className={styles.accMenuContentBlock__content}>{children}</div>
      )}
    </div>
  );
};

export default AccMenuContentBlock;
