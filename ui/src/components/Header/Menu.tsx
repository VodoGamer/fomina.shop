import { Component, Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

import styles from "../../assets/styles/header.module.sass";
import menu_icon from "../../assets/icons/menu.svg";
import menu_cross from "../../assets/icons/menu_cross.svg";

const Menu: Component = () => {
	const [showMenu, setShowMenu] = createSignal(false);

	function toggleMenu() {
		setShowMenu(!showMenu());
	}

	return (
		<>
			<Show when={showMenu()}>
				<Portal>
					<div class={styles.menu}>
						<nav>
							<ul>
								<li>
									<a href="/">Home</a>
								</li>
							</ul>
						</nav>
						<button class={styles.menu_cross} onClick={toggleMenu} tabIndex={0}>
							<img src={menu_cross} alt="" />
						</button>
					</div>
				</Portal>
			</Show>
			<button class={styles.menu_button} onClick={toggleMenu}>
				<img class={styles.header__image} src={menu_icon} alt="" />
			</button>
		</>
	);
};

export default Menu;
