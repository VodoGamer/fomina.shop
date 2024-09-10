import { useIsRouting } from "@solidjs/router";
import { type Component, Show } from "solid-js";

import Menu from "./Menu";
import { HeaderLoader } from "../HeaderLoader";
import styles from "./assets/header.module.css";
import logo from "./assets/logo.svg";

const Header: Component = () => {
	const isRouting = useIsRouting();
	return (
		<header class={styles.header}>
			<Show when={isRouting()}>
				<HeaderLoader />
			</Show>
			<div class={styles.header__logo}>
				<a href="/">
					<img class={styles.header__image} src={logo} alt="" />
				</a>
			</div>
			<div class={styles.header__buttons}>
				<Menu />
			</div>
		</header>
	);
};

export default Header;
