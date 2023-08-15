import { type Component, createResource, Show, For } from "solid-js";
import axios from "axios";

import Header from "../components/Header";
import CartProduct from "../components/CartProduct";
import { Product } from "../types/product";


async function getProducts(productIds: string[]): Promise<Product[]> {
	const returnList: Product[] = [];
	for (const productId of productIds) {
		returnList.push((await axios.get(`${import.meta.env.VITE_BASE_API_URL}/product/${productId}/`)).data);
	};
	return returnList;
}

function calculateOverallSum(products: Product[]): number {
	let sum: number = 0;
	for (const product of products) { sum += product.price; }
	return sum;
}

const Cart: Component = () => {
	const productIds = localStorage.getItem("cartProducts")?.split(",")
	const [products] = createResource(productIds, getProducts);
	const [overallSum] = createResource(products, calculateOverallSum)

	return (
		<>
			<Header />
			<main>
				<Show when={products()} fallback={<h1 class="cart-header">Ваша корзина пуста :(</h1>}>
					<h1 class="cart-header">Ваша корзина</h1>
					<div class="cart">
						<div class="cart-products">
							<For each={products()}>{(product) =>
								<CartProduct product={product} />
							}</For>
						</div>
						<div class="cart-information">
							<h3 class="cart-information__text">Предметов в корзине: {productIds?.length}</h3>
							<h3 class="cart-information__text">Итого к оплате: <Show when={overallSum}>{overallSum()}</Show>₽</h3>
							<a class="order-button" href="/">
								<h4 class="order-button__text">Перейти к оформлению</h4>
							</a>
						</div>
					</div>
				</Show>
			</main >
		</>
	);
}

export default Cart;
