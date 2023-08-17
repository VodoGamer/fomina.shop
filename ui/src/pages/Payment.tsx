import { Component } from "solid-js";
import { useParams } from "@solidjs/router";

import Header from "../components/Header";

import success from "../../static/icons/success.svg"
import processing from "../../static/icons/processing.svg"

type PaymentParams = {
	id: string,
}

const Payment: Component = () => {
	const params = (useParams() as PaymentParams);

	return (
		<>
			<Header />
			<h1>Успешная покупка!</h1>
			<div class="payment-description">
				<img class="payment-description__icon" src={processing} alt="" width="48px" />
				<p class="payment-description__text">Проверяем оплату...</p>
			</div>
			<div class="payment-description">
				<img class="payment-description__icon" src={success} alt="" width="48px" />
				<p class="payment-description__text">Вы успешно оплатили заказ №<b>{params.id}</b>. Мы в скором времени напишем вам на почту. Спасибо что выбрали нас❤️‍🔥.</p>
			</div>
			<a class="order-button" href="/">
				<h4 class="order-button__text">Перейти на главную</h4>
			</a>
		</>
	);
};


export default Payment;

