import { Component } from "solid-js";
import BurgerMenu from "./BurgerMenu";

const Header: Component = () => {
	return (
		<>
			<header class="header">
				<BurgerMenu />
				<a href="/" aria-label="Перейти на главную страницу"><img class="header__logo" width="284" src="/static/icons/fomina-logo.svg" alt="" /></a>
			</header>
		</>
	)
}

export default Header
