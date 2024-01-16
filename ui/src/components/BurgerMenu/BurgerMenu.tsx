import { type Component, createSignal, Show } from "solid-js";

import BurgerCategories from "./BurgerCategories";
import menu from "./menu.svg";
import cross from "./menu-cross.svg";
import styles from "./burgermenu.module.sass";

const BurgerMenu: Component = () => {
	const [burgerState, setBurgerState] = createSignal<boolean>(false);
	const toggle = () => setBurgerState(!burgerState());

	return (
		<>
			<img class={styles.toggler} onClick={toggle} src={menu} alt="" />
			<Show when={burgerState()}>
				<div class={styles.menu}>
					<img class={styles.toggler} onClick={toggle} src={cross} alt="" />
					<BurgerCategories />
				</div>
				<div class={styles.content} onClick={toggle}></div>
			</Show>
		</>
	);
};

export default BurgerMenu;
