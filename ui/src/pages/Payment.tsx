import { Component, Match, Switch, createResource } from "solid-js";
import { useParams } from "@solidjs/router";

import Header from "../components/Header";

import success from "../../static/icons/success.svg";
import processing from "../../static/icons/processing.svg";
import { Order } from "../types/order";
import axios from "axios";

type PaymentParams = {
	id: string;
};

async function getPayment(paymentId: string): Promise<Order> {
	return (
		await axios.get(`${import.meta.env.VITE_BASE_API_URL}/payment`, {
			params: { order_id: paymentId },
		})
	).data;
}

const Payment: Component = () => {
	const params = useParams() as PaymentParams;
	const [payment, { refetch }] = createResource(params.id, getPayment);
	setInterval(refetch, 5000);

	return (
		<>
			<Header />
			<h1>Успешная покупка!</h1>
			<Switch>
				<Match when={payment()?.status != "succeeded"}>
					<div class="payment-description">
						<img class="payment-description__icon" src={processing} alt="" width="48px" />
						<p class="payment-description__text">Проверяем оплату... Это будет недолго</p>
					</div>
				</Match>
				<Match when={payment()?.status == "succeeded"}>
					<div class="payment-description">
						<img class="payment-description__icon" src={success} alt="" width="48px" />
						<p class="payment-description__text">
							Вы успешно оплатили заказ №<b>{params.id}</b>. Мы в скором времени напишем вам на
							почту. Спасибо что выбрали нас❤️‍🔥.
						</p>
					</div>
					<a class="order-button" href="/">
						<h4 class="order-button__text">Перейти на главную</h4>
					</a>
				</Match>
			</Switch>
		</>
	);
};

export default Payment;
