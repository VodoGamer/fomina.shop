import type { Component } from "solid-js";

import styles from "./footer.module.sass";

const Footer: Component = () => {
	return (
		<footer class={styles.footer}>
			<a class={styles.link} href="https://instagram.com/fominakids">
				instagram
			</a>
			<a class={styles.link} href="https://t.me/fominakids">
				telegram
			</a>
			<a class={styles.link} href="/delivery_terms">
				условия доставки
			</a>
			<a class={styles.link} href="/contact_details">
				контакты
			</a>
		</footer>
	);
};

export default Footer;
