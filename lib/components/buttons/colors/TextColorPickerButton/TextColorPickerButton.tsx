import { FC, useLayoutEffect, useMemo } from "react";
import { HexColorPicker } from "react-colorful";
import { PORTAL_APP_ID, textTags } from "../../../../constants";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import ColorPickIcon from "./../../../../assets/icons/platte.svg?react";
import AccButton from "../../AccButton/AccButton";
import AccValueControlButton from "../../AccValueControlButton/AccValueControlButton";
import styled from "./TextColorPickerButton.module.scss";

const styleID = "acc-text-color-picker-style";
const rootClass = "acc-text-color-picker";

interface TextColorPickerButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const TextColorPickerButton: FC<TextColorPickerButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { color } = accState;

  const textSelectors = useMemo(() => {
    return textTags.reduce((acc, tag, index) => {
      const lastIndex = textTags.length - 1;
      const HTML = `html.${rootClass}`;
      const delimiter = index === lastIndex ? "" : ",";
      return (acc += `${HTML} ${tag}:not(#${PORTAL_APP_ID} *)${delimiter}`);
    }, "");
  }, []);

  const joinedTags = textTags
    .map((tag) => `${tag}:not(#${PORTAL_APP_ID} *)`)
    .join(",");

  const handleColorChange = (value: string) => {
    onChangeAccState((draft) => {
      draft.color = value;
    });
  };

  const initColorPickerHandler = () => {
    handleColorChange("");
  };

  useLayoutEffect(() => {
    if (color) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
                  ${textSelectors},${joinedTags} {
                  color: ${color} !important;
                }
            `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [color, joinedTags, textSelectors]);

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
