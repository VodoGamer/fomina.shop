import { Component } from "solid-js";

import BurgerMenu from "./BurgerMenu";

import logo from "../../static/icons/fomina-logo.svg";
import cart from "../../static/icons/shopping_cart.svg";

const Header: Component = () => {
	return (
		<>
			<header class="header">
				<BurgerMenu />
				<a href="/" aria-label="Перейти на главную страницу">
					<img class="header__logo" width="284" src={logo} alt="" />
				</a>
				<a href="/cart" aria-label="Перейти на страницу корзины">
					<img src={cart} alt="" />
				</a>
			</header>
		</>
	);
};

export default Header;
