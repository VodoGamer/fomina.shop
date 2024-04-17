import { Component } from "solid-js";

import styles from "../assets/styles/header.module.sass";
import logo from "../assets/icons/logo.svg";
import menu from "../assets/icons/menu.svg";

const Header: Component = () => {
	return (
		<div class={styles.header}>
			<div class={styles.header__block}>
				<a href="/">
					<img class={styles.header__image} src={logo} alt="" />
				</a>
			</div>
			<div class={styles.header__block}>
				<button class={styles.menu_button}>
					<img class={styles.header__image} src={menu} alt="" />
				</button>
			</div>
		</div>
	);
};

export default Header;
