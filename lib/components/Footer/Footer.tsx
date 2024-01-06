import { FC } from "react";
import styled from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styled.accFooter}>
      <a target="_blank" href="https://www.linkedin.com/in/vladi-iokhim-26505714b/"> Developed By Vladi Iokhim &#169;</a>
    </footer>
  );
};

export default Footer;
