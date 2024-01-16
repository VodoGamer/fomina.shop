import { type Component, createResource, Show, For, createSignal } from "solid-js";
import axios from "axios";
import qs from "qs";

import Header from "../../components/Header/Header";
import CartProduct from "../../components/Cart/CartProduct";
import { Product } from "../../types/product";

import styles from "./cart.module.sass";
import buttonStyles from "../../components/Cart/cart.module.sass";

export async function getProducts(productIds: string[]): Promise<Product[]> {
	return (
		await axios.get(`${import.meta.env.VITE_BASE_API_URL}/products`, {
			params: { product_ids: productIds },
			paramsSerializer: function (params) {
				return qs.stringify(params, { arrayFormat: "repeat" });
			},
		})
	).data;
}

export function calculateOverallSum(products: Product[] | undefined): number {
	let sum: number = 0;
	if (products == undefined) {
		return sum;
	}
	for (const product of products) {
		sum += product.price;
	}
	return sum;
}

const Cart: Component = () => {
	const localCart = localStorage.getItem("cartProducts")?.split(",");
	if (!localCart) {
		return (
			<>
				<Header />
				<h1 class={styles.header}>Ваша корзина пуста :(</h1>
			</>
		);
	}
	const [productIds, setProductIds] = createSignal<string[]>(localCart);
	const [products] = createResource(productIds, getProducts);

	return (
		<>
			<Header />
			<main>
				<Show
					when={!products.error}
					fallback={<h1 class={styles.header}>Произошла ошибка при загрузке товаров в корзине</h1>}
				>
					<Show
						when={products()}
						fallback={<h1 class={styles.header}>Загружаем товары в Вашей корзине...</h1>}
					>
						<h1 class={styles.header}>Ваша корзина</h1>
						<div class={styles.cart}>
							<div class={styles.products}>
								<For each={products()}>
									{(product) => (
										<CartProduct
											productIds={productIds}
											setProductIds={setProductIds}
											product={product}
										/>
									)}
								</For>
							</div>
							<div class={styles.information}>
								<h3 class={styles.information__text}>Предметов в корзине: {products()?.length}</h3>
								<h3 class={styles.information__text}>
									Итого к оплате: {calculateOverallSum(products())}₽
								</h3>
								<a class={buttonStyles.button} href="/purchase">
									<h4 class={buttonStyles.text}>Перейти к оформлению</h4>
								</a>
							</div>
						</div>
					</Show>
				</Show>
			</main>
		</>
	);
};

export default Cart;
