import { Component, Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";

import styles from "./header.module.sass";
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
						<div class={styles.header} style={{ "align-items": "start" }}>
							<nav>
								<ul class={styles.nav__list}>
									<li class={styles.nav__item}>
										<a class={styles.nav__link} href="/">
											Home
										</a>
									</li>
									<li class={styles.nav__item}>
										<a class={styles.nav__link} href="/">
											Home
										</a>
									</li>
								</ul>
							</nav>
							<button class={styles.menu_button} onClick={toggleMenu}>
								<img
									style={{ filter: "invert(1)" }}
									class={styles.header__image}
									src={menu_cross}
									alt=""
								/>
							</button>
						</div>
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
