const cartName = "cart1.2.0";

export interface CartItem {
	product_id: number;
	variations: number[];
	count: number;
}

export function getCart(): CartItem[] {
	return JSON.parse(localStorage.getItem(cartName) || "[]");
}

export function addToCart(
	product_id: number,
	variations: number[],
	count: number | undefined = 1,
) {
	const cart = getCart();
	const item: CartItem = {
		product_id: product_id,
		variations: variations,
		count: count,
	};
	cart.push(item);
	localStorage.setItem(cartName, JSON.stringify(cart));
}

export function removeFromCart(index: number) {
	const cart = getCart();
	if (index > -1) {
		cart.splice(index, 1);
	}
	localStorage.setItem(cartName, JSON.stringify(cart));
}
