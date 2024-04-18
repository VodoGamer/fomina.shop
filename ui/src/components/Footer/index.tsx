import { Component } from "solid-js";

import styles from "./assets/footer.module.sass";
import instagram_logo from "./assets/instagram.svg";

const Footer: Component = () => {
	return (
		<footer class={styles.footer}>
			<p class={styles.footer__text}>Социальные сети</p>
			<div class={styles.social}>
				<a href="https://instagram.com/fomina_style">
					<img class={styles.social__image} src={instagram_logo} alt="" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
