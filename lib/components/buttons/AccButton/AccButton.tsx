import { FC, ReactNode } from "react";
import classNames from "classnames";
import { IconSvgComponent } from "../../../types";
import { useTranslation } from "react-i18next";
import styles from "./AccButton.module.scss";
import QuestionMarkIcon from "../../../assets/icons/questionMark.svg?react";

interface DynamicButtonProps {
  children: ReactNode;
  elementType: string;
  [key: string]: unknown;
}

const DynamicButton: FC<DynamicButtonProps> = ({
  elementType,
  children,
  ...rest
}) => {
  const Element = elementType === "button" ? "button" : "div";
  const tabIndex = elementType === "div" ? 0 : undefined;
  return (
    <Element tabIndex={tabIndex} {...rest}>
      {children}
    </Element>
  );
};

interface AccButtonProps {
  Icon: IconSvgComponent;
  isToggled?: boolean;
  isActive?:boolean;
  children?: ReactNode;
  onToggle?: () => void;
  titleTranslationKey: string;
  elementType?: string;
  title?: string;
  stats?: number | string;
  styleIcon?: { [x: string]: unknown };
  styleTitle?: { [x: string]: unknown };
  className?: string;
  tooltipTranslationKey?: string;
}
const AccButton: FC<AccButtonProps> = ({
  Icon,
  isToggled,
  isActive,
  children,
  onToggle,
  titleTranslationKey,
  elementType = "button",
  title,
  stats,
  styleIcon,
  styleTitle,
  className,
  tooltipTranslationKey,
}) => {
  const { t } = useTranslation();
  const containerClass = classNames(`${styles.accButton} ${className}`, {
    [styles.isToggled]: isToggled,
    [styles.isActive]: isActive,
  });

  const renderTooltip = () => {
    if (!tooltipTranslationKey) return null;
    return (
      <>
        <QuestionMarkIcon
          title="Help"
          className={`${styles.accButton__icon} ${styles["accButton__icon--help"]}`}
        />
        <span data-tooltip={t(tooltipTranslationKey ?? "") ?? undefined}></span>
      </>
    );
  };

  return (
    <DynamicButton
      elementType={elementType}
      onClick={onToggle}
      className={containerClass}
    >
      {stats && <span className={styles.accButton__stats}>{stats}</span>}
      {renderTooltip()}

      <Icon
        style={styleIcon}
        title={title}
        className={styles.accButton__icon}
      />
      <h2 style={styleTitle} className={styles.accButton__title}>
        {t(titleTranslationKey)}
      </h2>
      <div className={styles.accButton__content}>{children}</div>
    </DynamicButton>
  );
};

export default AccButton;
