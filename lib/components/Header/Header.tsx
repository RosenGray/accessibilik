import { FC } from "react";
import CloseIcon from "../../assets/icons/close.svg?react";
import RestartAltIcon from '../../assets/icons/init.svg?react';
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

interface HeaderProps {
  onShow: () => void;
  onInit: () => void;
}

const Header: FC<HeaderProps> = ({ onInit, onShow }) => {
  const { t } = useTranslation();

  return (
    <header className={styles.accHeader}>
      <button onClick={onInit} className={styles.accHeader__resetBtn}>
        <RestartAltIcon />
      </button>
      <h3 className={styles.accHeader__title}>{t("accessibility-menu")}</h3>
      <button onClick={onShow} className={styles.accHeader__closeBtn}>
        <CloseIcon />
      </button>
    </header>
  );
};

export default Header;
