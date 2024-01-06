import { FC } from "react";
import styled from "./AccessibilityButton.module.scss";
import AccessibleIcon from "../../../assets/icons/accessibleIcon.svg?react";

interface AccessibilityButtonProps {
  onShow: () => void;
}

const AccessibilityButton: FC<AccessibilityButtonProps> = ({onShow}) => {
  return (
    <a
      onClick={onShow}
      role="button"
      title="Open Accessibility Menu"
      className={styled.AccessibilityIcon}
    >
      <AccessibleIcon title="AccessibleIcon"/>
    </a>
  );
};

export default AccessibilityButton;
