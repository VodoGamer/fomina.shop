import styles from "./header.module.css";
import cart_icon from "./cart.svg";
import Menu from "../menu";

export default function Header() {
	return (
		<header class={styles.header}>
			<a class={styles.logo__link} href="/">
				<h1>Fomina</h1>
			</a>
			<div class={styles.icons}>
				<a href="/cart">
					<img class={styles.cart} src={cart_icon} alt="cart" width="28px" />
				</a>
				<Menu />
			</div>
		</header>
	);
}
