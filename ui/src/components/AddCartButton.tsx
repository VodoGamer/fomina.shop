import { Match, Switch, createSignal } from "solid-js";

function isProductInCart(productId: number): boolean {
	const currentCart = localStorage.getItem("cartProducts")?.split(",");
	const productIndexInCart = currentCart?.indexOf(String(productId));
	if (productIndexInCart == undefined || productIndexInCart == -1) {
		return false;
	}
	return true;
}

export default function AddCartButton(props: { productId: number }) {
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
				<a class="order-button order-button_active" href="/cart">
					<p class="order-button__text">Уже у вас в корзине!</p>
				</a>
			}
		>
			<Match when={!inCart()}>
				<button class="order-button" onClick={() => addToCart(props.productId)}>
					<p class="order-button__text">Добавить в корзину</p>
				</button>
			</Match>
		</Switch>
	);
}
