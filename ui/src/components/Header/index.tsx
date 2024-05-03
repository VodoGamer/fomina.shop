import type { Component } from "solid-js";

import Menu from "./Menu";

import styles from "./assets/header.module.sass";
import logo from "./assets/logo.svg";

const Header: Component = () => {
	return (
		<header class={styles.header}>
			<div class={styles.header__logo}>
				<a href="/">
					<img class={styles.header__image} src={logo} alt="" />
				</a>
			</div>
			<div class={styles.header__buttons}>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
