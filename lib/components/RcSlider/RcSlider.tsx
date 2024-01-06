import { FC } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./RcSlider.module.scss";

interface RcSliderProps {
  range?: boolean;
  min?: number;
  max?: number;
  value?: number;
  onChange: (n: number | number[]) => void;
  height?: number;
  vertical?: boolean;
}

const RcSlider: FC<RcSliderProps> = ({
  range,
  min,
  max,
  value,
  onChange,
  vertical,
}) => {
  return (
    <Slider
      className={styles.accRcSlider}
      range={range}
      min={min}
      max={max}
      value={value}
      vertical={vertical}
      onChange={onChange}
    />
  );
};

export default RcSlider;
