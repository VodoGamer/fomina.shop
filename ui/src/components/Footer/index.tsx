import { Component } from "solid-js";

import styles from "./footer.module.sass";

const Footer: Component = () => {
  return (
    <footer class={styles.footer}>
      <a class={styles.link} href="https://instagram.com">
        instagram
      </a>
      <a class={styles.link} href="https://telegram.com">
        telegram
      </a>
      <a class={styles.link} href="#">
        политика конфиденциальности
      </a>
      <a class={styles.link} href="#">
        условия использования
      </a>
    </footer>
  );
};

export default Footer;
