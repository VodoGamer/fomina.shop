import { Match, Switch, createSignal } from "solid-js";

import styles from "./cart.module.sass";

function isProductInCart(productId: number): boolean {
	const currentCart = localStorage.getItem("cartProducts")?.split(",");
	const productIndexInCart = currentCart?.indexOf(String(productId));
	if (productIndexInCart == undefined || productIndexInCart == -1) {
		return false;
	}
	return true;
}

export default function AddToCartButton(props: { productId: number }) {
	const [inCart, setInCart] = createSignal<boolean>(isProductInCart(props.productId));

	function addToCart(newId: number) {
		setInCart(true);
		const currentCart = localStorage.getItem("cartProducts")?.split(",");
		if (currentCart) {
			currentCart.push(String(newId));
			localStorage.setItem("cartProducts", String(currentCart));
		} else {
			return localStorage.setItem("cartProducts", String(newId));
		}
	}

	return (
		<Switch
			fallback={
				<a class={`${styles.button} ${styles.active}`} href="/cart">
					<p class={styles.text}>Уже у вас в корзине!</p>
				</a>
			}
		>
			<Match when={!inCart()}>
				<button class={styles.button} onClick={() => addToCart(props.productId)}>
					<p class={styles.text}>Добавить в корзину</p>
				</button>
			</Match>
		</Switch>
	);
}
