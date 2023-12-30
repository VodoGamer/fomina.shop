import { Component } from "solid-js";

import BurgerMenu from "../BurgerMenu/BurgerMenu";

import logo from "./fomina-logo.svg";
import cart from "./shopping_cart.svg";
import styles from "./header.module.sass";

const Header: Component = () => {
	return (
		<>
			<header class={styles.header}>
				<BurgerMenu />
				<a href="/" aria-label="Перейти на главную страницу">
					<img class={styles.logo} width="284" src={logo} alt="" />
				</a>
				<a href="/cart" aria-label="Перейти на страницу корзины">
					<img src={cart} alt="" />
				</a>
			</header>
		</>
	);
};

export default Header;
