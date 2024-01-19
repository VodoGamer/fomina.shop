import { Component, Match, Show, Switch, createResource, createSignal } from "solid-js";

import Header from "../../components/Header/Header";
import PurchaseForm from "../../components/Purchase/PurchaseForm";
import { calculateOverallSum } from "../cart/Cart";
import { Order } from "../../types/order";

import styles from "./purchase.module.sass";
import cart from "../../components/Cart/CartLogic";
import { Product } from "../../types/product";
import axios from "axios";
import qs from "qs";

async function getProducts(productIds: number[]): Promise<Product[]> {
	return (
		await axios.get(`${import.meta.env.VITE_BASE_API_URL}/products`, {
			params: { product_ids: productIds },
			paramsSerializer: function (params) {
				return qs.stringify(params, { arrayFormat: "repeat" });
			},
		})
	).data;
}

const Purchase: Component = () => {
	const [orderUrl, setOrderUrl] = createSignal<undefined | Order>();

	const productIds = cart();
	if (productIds == undefined) {
		return (
			<>
				<Header />
				<h1 class={styles.header}>У вас нет товаров в корзине</h1>
			</>
		);
	}
	const [cartProducts] = createResource(cart(), getProducts);
	const [cartSum] = createResource(cartProducts, calculateOverallSum);

	return (
		<>
			<Header />
			<h1 class={styles.header}>
				Оформление заказа
				<Show when={cartSum()}>{` на ${String(cartSum())}₽`}</Show>
			</h1>
			<Switch>
				<Match when={!orderUrl()}>
					<PurchaseForm setOrderUrl={setOrderUrl} cartSum={cartSum()} productIds={productIds} />
				</Match>
				<Match when={orderUrl()}>
					<h2>
						<a href={orderUrl()?.confirmation?.confirmation_url}>
							Заказ создан, осталось только оплатить
						</a>
					</h2>
				</Match>
			</Switch>
		</>
	);
};

export default Purchase;
