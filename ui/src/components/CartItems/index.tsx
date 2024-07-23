import { For, Match, Show, Switch, createResource } from "solid-js";
import type ProductInterface from "../../interfaces/product";
import { getFromApi } from "../../utils/api";
import { getCart, removeFromCart } from "../../utils/cart";
import Button from "../Button";
import CartProduct from "./CartProduct";

import { Transition } from "solid-transition-group";
import CartOrder from "../CartOrder";
import { Loader } from "../Loader";
import styles from "./assets/cartItems.module.sass";

async function getProducts(productIds: number[]): Promise<ProductInterface[]> {
	if (productIds.length === 0) {
		return [];
	}
	const response = await getFromApi("products", {
		params: { ids: productIds },
	});
	for (const [key, product] of Object.entries(response.data)) {
		if (product == null) {
			removeFromCart(Number(key));
			response.data.splice(Number(key), 1);
		}
	}

	return response.data;
}

async function calculateSum(products: ProductInterface[]): Promise<number> {
	return products.reduce((sum, product) => sum + product.price, 0);
}

export default function CartItems() {
	const cart = getCart();
	const productIds = cart.map((item) => item.product_id);
	const [products, { mutate }] = createResource(productIds, getProducts);
	const [sum] = createResource(products, calculateSum);

	function deleteFromCart(index: number) {
		mutate((prevItems) => {
			const newItems = [...prevItems];
			newItems.splice(index, 1);
			return newItems;
		});

		removeFromCart(index);
	}

	return (
		<>
			<Show
				when={products()?.length !== 0}
				fallback={
					<>
						<h1>Корзина пуста</h1>
						<Button text="Перейти к покупкам" link="/category/all-products" />
					</>
				}
			>
				<h1>Корзина</h1>
			</Show>
			<Show when={products.loading}>
				<Loader />
			</Show>
			<Transition mode="outin" name="slide-fade">
				<Switch>
					<Match when={products.error}>
						<p>Error...</p>
					</Match>
					<Match when={products()}>
						<div class={styles.products}>
							<For each={products()}>
								{(product, index) => (
									<CartProduct
										product={product}
										deleteFromCart={deleteFromCart}
										index={index()}
									/>
								)}
							</For>
						</div>
					</Match>
				</Switch>
			</Transition>
			<Show when={sum() !== 0}>
				<CartOrder cartSum={sum} />
			</Show>
		</>
	);
}
