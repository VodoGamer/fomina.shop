import axios from "axios";
import { Setter } from "solid-js";

function getValueForId(id: string) {
	return (document.getElementById(id) as HTMLInputElement).value;
}

async function createOrder(cartSum: number) {
	return (await axios.post(`${import.meta.env.VITE_BASE_API_URL}/order`, {
		full_name: getValueForId("name"),
		address: getValueForId("address"),
		phone: getValueForId("telephone-number"),
		email: getValueForId("email"),
		amount: cartSum,
	})).data;
}

export default function PurchaseForm(props: { setOrder: Setter<undefined | string>, cartSum: number }) {
	return (
		<div class="purchase">
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
				<input class="purchase__input" type="email" name="email" id="email" required />
			</p>
			<button class="order-button" type="submit" onClick={async () => { props.setOrder(await createOrder(props.cartSum)); }}>
				<p class="order-button__text">Перейти к оплате</p>
			</button>
		</div>
	);
};
