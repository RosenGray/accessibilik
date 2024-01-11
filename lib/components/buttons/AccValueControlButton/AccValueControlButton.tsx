import { CSSProperties, FC } from "react";
import styles from "./AccValueControlButton.module.scss";
import RestartAltIcon from "./../../../assets/icons/init.svg?react";
import AddIcon from "./../../../assets/icons/add.svg?react";
import RemoveIcon from "./../../../assets/icons/remove.svg?react";
import { IconSvgComponent } from "../../../types";

export type ValueControlType = "init" | "increase" | "decrease";
interface AccValueControlButtonProps {
  controlType: ValueControlType;
  onClick?: () => void;
  style?: CSSProperties;
}

const AccValueControlButton: FC<AccValueControlButtonProps> = ({
  controlType,
  onClick,
  style,
}) => {
  let Icon: IconSvgComponent;
  switch (controlType) {
    case "increase":
      Icon = AddIcon;
      break;
    case "decrease":
      Icon = RemoveIcon;
      break;
    case "init":
      Icon = RestartAltIcon;
      break;
    default:
      Icon = RestartAltIcon;
  }

  return (
    <button
      style={style}
      onClick={onClick}
      className={styles.accValueControlButton}
    >
      <Icon />
    </button>
  );
};

export default AccValueControlButton;
