import { FC } from "react";
import styles from "./AccValueControl.module.scss";
import AccValueControlButton from "../AccValueControlButton/AccValueControlButton";

interface AccValueControlProps {
  onIncrease: () => void;
  onToggle: () => void;
  onDescrease: () => void;
}
const AccValueControl: FC<AccValueControlProps> = ({
  onIncrease,
  onToggle,
  onDescrease,
}) => {
  return (
    <div className={styles.accValueControl}>
      <AccValueControlButton onClick={onIncrease} controlType="increase" />
      <AccValueControlButton onClick={onToggle} controlType="init" />
      <AccValueControlButton onClick={onDescrease} controlType="decrease" />
    </div>
  );
};

export default AccValueControl;
