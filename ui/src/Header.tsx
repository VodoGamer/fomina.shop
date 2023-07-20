import { Component } from "solid-js";

import BurgerMenu from "./BurgerMenu";

import logo from "../static/icons/fomina-logo.svg";

const Header: Component = () => {
	return (
		<>
			<header class="header">
				<BurgerMenu />
				<a href="/" aria-label="Перейти на главную страницу"><img class="header__logo" width="284" src={logo} alt="" /></a>
			</header>
		</>
	)
}

export default Header
