import { type Component, createSignal, Show } from "solid-js";

import Categories from "./Categories";

import menu from "../../static/icons/menu.svg";
import cross from "../../static/icons/menu-cross.svg";

const BurgerMenu: Component = () => {
	const [burgerState, setBurgerState] = createSignal<boolean>(false);
	const toggle = () => setBurgerState(!burgerState())

	return (
		<>
			<img class="menu" onClick={toggle} src={menu} alt="" />
			<Show when={burgerState()}>
				<div class="burger-menu">
					<img class="menu-cross" onClick={toggle} src={cross} alt="" />
					<Categories />
				</div>
				<div class="burger-menu__outside" onClick={toggle}></div>
			</Show>
		</>
	);
}

export default BurgerMenu;
