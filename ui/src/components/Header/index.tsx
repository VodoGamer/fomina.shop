import { Component } from "solid-js";

import styles from "./header.module.sass";
import logo from "../../assets/icons/logo.svg";
import Menu from "./Menu";

const Header: Component = () => {
	return (
		<header class={styles.header}>
			<div class={styles.header__block}>
				<a href="/">
					<img class={styles.header__image} src={logo} alt="" />
				</a>
			</div>
			<div class={styles.header__block}>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
