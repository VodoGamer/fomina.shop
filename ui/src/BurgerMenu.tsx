import { type Component, createSignal, Show } from "solid-js";
import Categories from "./Categories";

const BurgerMenu: Component = () => {
	const [burgerState, setBurgerState] = createSignal<boolean>(false);
	const toggle = () => setBurgerState(!burgerState())

	return (
		<>
			<img class="menu" onClick={toggle} src="/static/icons/menu.svg" alt="" />
			<Show when={burgerState()}>
				<div class="burger-menu">
					<img class="menu-cross" onClick={toggle} src="/static/icons/menu-cross.svg" alt="" />
					<Categories />
				</div>
				<div class="burger-menu__outside" onClick={toggle}></div>
			</Show>
		</>
	);
}

export default BurgerMenu;
