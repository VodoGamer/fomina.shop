import { Component } from "solid-js"
import Header from "../components/Header"

const Purchase: Component = () => {
	return (
		<>
			<Header />
			<h1 class="purchase-header">Оформление заказа</h1>
			<form class="purchase" action="/" method="post">
				<p class="purchase__field">
					<label class="purchase__label" for="name">Имя, фамилия</label>
					<input class="purchase__input" type="text" name="name" id="name" required />
				</p>
				<p class="purchase__field">
					<label class="purchase__label" for="address">Полный адрес</label>
					<input class="purchase__input" type="text" name="address" id="address" required />
				</p>
				<p class="purchase__field">
					<label class="purchase__label" for="telephone-number">Номер телефона</label>
					<input class="purchase__input" type="tel" name="telephone-number" id="telephone-number" required maxlength="20" />
				</p>
				<p class="purchase__field">
					<label class="purchase__label" for="email">Электронная почта</label>
					<input class="purchase__input" type="text" name="email" id="email" required />
				</p>
				<button class="order-button" type="submit"><p class="order-button__text">Перейти к оплате</p></button>
			</form>
		</>
	)
}

export default Purchase
