import { type Component, createSignal, Show } from "solid-js";

const BurgerMenu: Component = () => {
	const [burgerState, setBurgerState] = createSignal<boolean>(false);
	const toggle = () => setBurgerState(!burgerState())

	return (
		<>
			<img class="menu" onClick={toggle} src="/static/icons/menu.svg" alt="" />
			<Show when={burgerState()}>
				<div class="burger-menu">
					<img class="menu-cross" onClick={toggle} src="/static/icons/menu-cross.svg" alt="" />
					<a class="burger-menu__link" href="">Детское</a>
					<a class="burger-menu__link" href="">Женское</a>
					<a class="burger-menu__link" href="">Мужское</a>
				</div>
				<div class="burger-menu__outside" onClick={toggle}></div>
			</Show>
		</>
	);
}

export default BurgerMenu;
