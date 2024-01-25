import { type Component, Show, For, createResource } from "solid-js";
import { Store, createStore } from "solid-js/store";

import Header from "../../components/Header/Header";
import CartProduct from "../../components/Cart/CartProduct";
import { Product } from "../../types/product";
import cart from "../../components/Cart/CartLogic";

import styles from "./cart.module.sass";
import buttonStyles from "../../components/Cart/cart.module.sass";
import Delivery, { getDeliveryPrice, officeCode } from "../../components/Delivery/Delivery";

export function calculateOverallSum(
	products: Product[],
	delivery_price: number | undefined = 0,
): number {
	let sum: number = 0;
	for (const product of products) {
		sum += product.price;
	}
	return sum + delivery_price;
}

export interface ProductIndex extends Product {
	index: number;
}
const [store, setStore] = createStore<Store<{ products: ProductIndex[] }>>({
	products: [],
});
export function addProductToStore(product: ProductIndex): void {
	setStore("products", (products) => [...products, product]);
}
export function removeFromStore(index: number): void {
	setStore("products", (prev) => prev.filter((v, _) => v.index !== index));
}

const Cart: Component = () => {
	const [deliveryPrice] = createResource(officeCode, getDeliveryPrice);

	return (
		<>
			<Header />
			<main>
				<Show when={cart().length} fallback={<h1 class={styles.header}>Ваша корзина пуста :(</h1>}>
					<h1 class={styles.header}>Ваша корзина</h1>
					<div class={styles.cart}>
						<div class={styles.products}>
							<For each={cart()}>
								{(productId, index) => <CartProduct index={index()} productId={productId} />}
							</For>
						</div>
						<div class={styles.information}>
							<h3 class={styles.information__text}>Предметов в корзине: {cart().length}</h3>
							<Delivery />
							<Show when={officeCode()}>
								<Show when={!deliveryPrice.error}>
									<Show when={deliveryPrice()} fallback={<h1>Загружаем...</h1>}>
										<p class={styles.information__text}>Цена доставки: {deliveryPrice()}₽</p>
										<h3 class={styles.information__text}>
											Итого к оплате: {calculateOverallSum(store.products, deliveryPrice())}₽
										</h3>
										<a class={buttonStyles.button} href="/purchase">
											<h4 class={buttonStyles.text}>Перейти к оформлению</h4>
										</a>
									</Show>
								</Show>
							</Show>
						</div>
					</div>
				</Show>
			</main>
		</>
	);
};

export default Cart;
