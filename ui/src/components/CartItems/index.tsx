import { For, Match, Show, Switch, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";

import Button from "~/components/Button";
import CartOrder from "~/components/CartOrder";
import ErrorBox from "~/components/ErrorBox";
import { Loader } from "~/components/Loader";
import type { CartStore } from "~/interfaces/cart";
import { getCart, removeFromCart } from "~/utils/cart";
import { getBulkProducts } from "~/utils/products";

import styles from "./assets/cartItems.module.css";
import CartProduct from "./CartProduct";

export default function CartItems() {
	const cart = getCart();
	const productIds = cart.map((item) => item.product_id);
	const [products, { mutate }] = createResource(productIds, getBulkProducts);
	const [productsPrice, setProductsPrice] = createStore<CartStore[]>([]);

	function deleteFromCart(index: number) {
		mutate((prevItems) => {
			if (!prevItems) return;
			const newItems = [...prevItems];
			newItems.splice(index, 1);
			setProductsPrice(productsPrice.filter((item) => item.index !== index));
			return newItems;
		});
		removeFromCart(index);
	}

	function addToSum(item: CartStore) {
		setProductsPrice([...productsPrice, item]);
	}

	function sum() {
		return productsPrice.reduce((a, b) => a + b.price, 0);
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
						<ErrorBox message={"Не удалось загрузить товары из корзины"} />
					</Match>
					<Match when={products()}>
						<div class={styles.products}>
							<For each={products()}>
								{(product, index) => (
									<CartProduct
										product={product}
										deleteFromCart={deleteFromCart}
										index={index()}
										cart={cart}
										addToSum={addToSum}
									/>
								)}
							</For>
						</div>
					</Match>
				</Switch>
			</Transition>
			<Show when={productsPrice.length}>
				<CartOrder cartSum={sum()} />
			</Show>
		</>
	);
}
