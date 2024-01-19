import { createSignal } from "solid-js";
import { removeFromStore } from "../../pages/cart/Cart";

const localStorageCart = localStorage.getItem("cartProducts");
const [cart, setCart] = createSignal<number[]>(JSON.parse(localStorageCart || "[]"));

function updateCartProducts() {
	localStorage.setItem("cartProducts", JSON.stringify(cart()));
}

export function addToCart(productId: number) {
	setCart((prev) => [...prev, productId]);
	updateCartProducts();
}

export function removeFromCart(index: number) {
	removeFromStore(index);
	setCart((prev) => prev.filter((_, i) => i !== index));
	updateCartProducts();
}

export default cart;
