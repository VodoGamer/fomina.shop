import { type Accessor, For, type Setter, createSignal } from "solid-js";

import type { PurchaseType } from "../../schemas/purchase";
import { createPurchase } from "../../utils/purchase";
import Button from "../Button";
import ErrorBox from "../ErrorBox";
import Input from "../Input";
import styles from "./PurchaseForm.module.css";

export default function PurchaseForm(props: {
	sum: Accessor<number>;
	setPurchase: Setter<PurchaseType | undefined>;
}) {
	const [issues, setIssues] = createSignal<string[] | undefined>();

	return (
		<>
			<div class={styles.validation}>
				<form>
					<Input
						labelText="Ф.И.О"
						inputName="name"
						id="name"
						containerClass={styles.input}
					/>
					<Input
						labelText="Номер телефона"
						inputName="phone_number"
						id="phone_number"
						containerClass={styles.input}
						type="tel"
					/>
					<Input
						labelText="Адрес электронной почты"
						inputName="email"
						id="email"
						containerClass={styles.input}
						type="email"
					/>
					<Input
						labelText="Адрес доставки"
						inputName="address"
						id="address"
						containerClass={styles.input}
					/>
				</form>
				<div class={styles.issues}>
					<For each={issues()}>{(issue) => <ErrorBox message={issue} />}</For>
				</div>
			</div>
			<Button
				style={{ "margin-top": "24px" }}
				text={`Оформить заказ на ${props.sum()}₽`}
				onClick={() => createPurchase(setIssues, props.setPurchase)}
			/>
		</>
	);
}
