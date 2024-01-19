import { For, Setter, createSignal } from "solid-js";
import { Issues, safeParse } from "valibot";
import { PurchaseData, PurchaseSchema } from "../../schemas/purchaseSchema";
import axios from "axios";

import PurchaseError from "./PurchaseError";
import styles from "./styles.module.sass";
import { Order } from "../../types/order";

function getValueForId(id: string) {
	return (document.getElementById(id) as HTMLInputElement).value;
}

function parseForm() {
	const purchase = safeParse(PurchaseSchema, {
		name: getValueForId("name"),
		address: getValueForId("address"),
		phoneNumber: getValueForId("telephone-number"),
		email: getValueForId("email"),
	});
	return purchase;
}

async function createOrder(
	purchase: PurchaseData,
	cartSum: number,
	productIds: string[] | undefined,
) {
	return (
		await axios.post(`${import.meta.env.VITE_BASE_API_URL}/order`, {
			full_name: purchase.name,
			address: purchase.address,
			phone: purchase.phoneNumber,
			email: purchase.email,
			amount: cartSum,
			product_ids: productIds,
		})
	).data;
}

export default function PurchaseForm(props: {
	setOrderUrl: Setter<Order | undefined>;
	cartSum: number | undefined;
	productIds: string[] | undefined;
}) {
	const [issues, setIssues] = createSignal<Issues | undefined>();

	return (
		<div class={styles.purchase}>
			<p class={styles.purchase__field}>
				<label class={styles.purchase__label} for="name">
					Имя, фамилия
				</label>
				<input class={styles.purchase__input} type="text" name="name" id="name" required />
			</p>
			<p class={styles.purchase__field}>
				<label class={styles.purchase__label} for="address">
					Полный адрес
				</label>
				<input class={styles.purchase__input} type="text" name="address" id="address" required />
			</p>
			<p class={styles.purchase__field}>
				<label class={styles.purchase__label} for="telephone-number">
					Номер телефона
				</label>
				<input
					class={styles.purchase__input}
					type="tel"
					name="telephone-number"
					id="telephone-number"
					required
					maxlength="20"
				/>
			</p>
			<p class={styles.purchase__field}>
				<label class={styles.purchase__label} for="email">
					Электронная почта
				</label>
				<input class={styles.purchase__input} type="email" name="email" id="email" required />
			</p>
			<button
				class="order-button"
				type="submit"
				onClick={async () => {
					const purchase = parseForm();
					if (!purchase.success) {
						setIssues(purchase.issues);
					} else {
						setIssues();
						const response = await createOrder(purchase.output, props.cartSum, props.productIds);
						props.setOrderUrl(response);
					}
				}}
			>
				<p class="order-button__text">Перейти к оплате</p>
			</button>
			<For each={issues()}>{(issue) => <PurchaseError errorText={issue.message} />}</For>
		</div>
	);
}
