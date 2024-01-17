import { Component } from "solid-js";

import BurgerMenu from "../BurgerMenu/BurgerMenu";

import logo from "./fomina-logo.svg";
import cart_icon from "./shopping_cart.svg";
import styles from "./header.module.sass";

const Header: Component = () => {
	return (
		<>
			<header class={styles.header}>
				<BurgerMenu />
				<a href="/" aria-label="Перейти на главную страницу">
					<img class={styles.logo} width="284" src={logo} alt="" />
				</a>
				<a class={styles.cart} href="/cart" aria-label="Перейти на страницу корзины">
					<img src={cart_icon} alt="" />
					<p class={styles.cart_products_count}>
						{localStorage.getItem("cartProducts")?.split(",").length}
					</p>
				</a>
			</header>
		</>
	);
};

export default Header;
