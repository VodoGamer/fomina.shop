import { SelectedVariation } from "../interfaces/productVariation";

export interface CartItem {
	product_id: number;
	variations: SelectedVariation[];
	count: number;
}

export function getCart(): CartItem[] {
	return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(
	product_id: number,
	variations: SelectedVariation[],
	count: number | undefined = 1,
) {
	const cart = getCart();
	const item: CartItem = {
		product_id: product_id,
		variations: variations,
		count: count,
	};
	cart.push(item);
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(index: number) {
	const cart = getCart();
	if (index > -1) {
		cart.splice(index, 1);
	}
	localStorage.setItem("cart", JSON.stringify(cart));
}
