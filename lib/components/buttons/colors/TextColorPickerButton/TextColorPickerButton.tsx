import { FC } from "react";
import { HexColorPicker } from "react-colorful";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import ColorPickIcon from "./../../../../assets/icons/platte.svg?react";
import AccButton from "../../AccButton/AccButton";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";
import styled from "./TextColorPickerButton.module.scss";

interface TextColorPickerButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const TextColorPickerButton: FC<TextColorPickerButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { color } = accState;

  const handleColorChange = (value: string) => {
    onChangeAccState((draft) => {
      draft.color = value;
    });
  };

  const initColorPickerHandler = () => {
    handleColorChange("");
  };

  return (
    <AccButton
      Icon={ColorPickIcon}
      titleTranslationKey="colors.textColorPicker"
      elementType="div"
      title="Text Color Picker"
      className={styled.accButtonTextColorPicker}
    >
      <div className={styled.accTextColorPicker}>
        <div className={styled.accTextColorPicker__topContainer}>
          <AccValueControlButton
            onClick={initColorPickerHandler}
            controlType="init"
          />
          <input
            placeholder="#000000"
            type="text"
            value={color}
            className={styled.accTextColorPicker__inputText}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
        <HexColorPicker
          className={styled.accTextColorPicker__hexColorPicker}
          color={color}
          onChange={handleColorChange}
        />
      </div>
    </AccButton>
  );
};

export default TextColorPickerButton;
