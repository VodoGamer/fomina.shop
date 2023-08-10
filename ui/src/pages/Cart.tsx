import { type Component, createResource, Show } from "solid-js";
import axios from "axios";

import Header from "../Header";
import CartProduct from "../components/CartProduct";


const getProducts = async (product_ids: string[]) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/product/${product_ids}/`)).data;

const Cart: Component = () => {
	const product_ids = localStorage.getItem("cartProducts")?.split(",")
	const [product] = createResource(product_ids, getProducts);

	return (
		<>
			<Header />
			<main>
				<h1 class="cart-header">Ваша корзина</h1>
				<div class="cart">
					<div class="cart-products">
						<Show when={product()} fallback="Товары загружаются...">
							<CartProduct product={product()} />
						</Show>
					</div>
					<div class="cart-information">
						<h3 class="cart-information__text">Предметов в корзине: {product_ids?.length}</h3>
						<h3 class="cart-information__text">Итого к оплате: 5500₽</h3>
						{/* TODO: overall sum */}
						<a class="order-button" href="/">
							<h4 class="order-button__text">Перейти к оформлению</h4>
						</a>
					</div>
				</div>
			</main >
		</>
	);
}

export default Cart;
