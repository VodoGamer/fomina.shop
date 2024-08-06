import { For, Match, Show, Switch, createResource } from "solid-js";
import { type CartItem, getCart, removeFromCart } from "../../utils/cart";
import Button from "../Button";
import CartProduct from "./CartProduct";

import { createStore } from "solid-js/store";
import { Transition } from "solid-transition-group";
import { getBulkProducts } from "../../utils/products";
import CartOrder from "../CartOrder";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import styles from "./assets/cartItems.module.sass";

export default function CartItems() {
	const cart: CartItem[] = getCart();
	const productIds = cart.map((item) => item.product_id);
	const [products, { mutate }] = createResource(productIds, getBulkProducts);
	const [productsPrice, setProductsPrice] = createStore<number[]>([]);

	function deleteFromCart(index: number) {
		mutate((prevItems) => {
			if (!prevItems) return;
			const newItems = [...prevItems];
			newItems.splice(index, 1);
			setProductsPrice(productsPrice.filter((_, i) => i !== index));
			return newItems;
		});
		removeFromCart(index);
	}

	function addToSum(price: number) {
		setProductsPrice([...productsPrice, price]);
	}

	function sum() {
		return productsPrice.reduce((a, b) => a + b, 0);
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
