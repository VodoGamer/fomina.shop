import { createSignal, For, createResource } from "solid-js";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { getCartProducts } from "~/utils/products";

import CartProduct from "./CartProduct";
import { getCart, removeFromCart } from "../../utils/cart";
import CartOrder from "../CartOrder";

export default function CartItems() {
	const [cart, setCart] = createSignal(getCart());
	const [cartSum, setCartSum] = createSignal(0);
	const [products] = createResource(cart, getCartProducts);

	function deleteFromCart(index: number) {
		removeFromCart(index);
		setCart(getCart());
		setCartSum(0);
	}

	function addToSum(item: number) {
		setCartSum((prev) => prev + item);
	}

	return (
		<Card class="w-full">
			<CardHeader>
				<CardTitle class="text-2xl font-bold">Корзина</CardTitle>
			</CardHeader>
			<CardContent class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<For each={products()}>
					{(product, index) => (
						<CartProduct
							product={product.product}
							variations={product.variations}
							deleteFromCart={deleteFromCart}
							index={index}
							addToSum={addToSum}
						/>
					)}
				</For>
			</CardContent>
			<CardFooter class="flex items-center justify-between">
				<CartOrder cartSum={cartSum()} />
			</CardFooter>
		</Card>
	);
}
