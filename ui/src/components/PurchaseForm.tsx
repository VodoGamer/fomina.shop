import { For, type Setter, Show, createResource, createSignal } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

import type { PurchaseType } from "../schemas/purchase";
import { getCities } from "../utils/geonames";
import { createPurchase } from "../utils/purchase";
import Button from "./Button";
import DeliveryServices from "./Delivery/DeliveryServices";
import ErrorBox from "./ErrorBox";
import Input from "./Input";
import InputWithDropdown from "./InputWithDropdown";
import type { purchaseSumStore } from "./purchase";

export enum DeliveryMethod {
	SDEK = "СДЭК",
	SDEK_COURIER = "СДЭК Курьер",
	RussianPost = "Почта России",
}

export default function PurchaseForm(props: {
	sumStore: purchaseSumStore;
	setSumStore: SetStoreFunction<purchaseSumStore>;
	setPurchase: Setter<PurchaseType | undefined>;
}) {
	const [issues, setIssues] = createSignal<string[] | undefined>();
	const [cityText, setCityText] = createSignal<string>();
	const [cities] = createResource(cityText, getCities);
	const [cityChecked, setCityChecked] = createSignal<boolean>(false);
	const [deliveryMethod, setDeliveryMethod] = createSignal<DeliveryMethod>();

	return (
		<>
			<div class="grid md:grid-cols-2 gap-4">
				<form>
					<Input labelText="Ф.И.О" id="name" />
					<Input labelText="Номер телефона" id="phone_number" type="tel" />
					<Input labelText="Адрес электронной почты" id="email" type="email" />
					<InputWithDropdown
						labelText="Город"
						setInputText={setCityText}
						setChecked={setCityChecked}
						options={cities()?.geonames.map(
							(g) => `${g.name}, ${g.adminName1}, ${g.countryName}`,
						)}
					/>
					<Show when={cityChecked()}>
						<DeliveryServices
							deliveryMethod={deliveryMethod}
							setDeliveryMethod={setDeliveryMethod}
							setSumStore={props.setSumStore}
							city={cityText()}
						/>
					</Show>
				</form>
				<div class="grid gap-4">
					<For each={issues()}>{(issue) => <ErrorBox message={issue} />}</For>
				</div>
			</div>
			<Show when={cityChecked() && props.sumStore.delivery > 0}>
				<Button
					text={`Оформить заказ на ${props.sumStore.products.reduce((a, b) => a + b, 0) + props.sumStore.delivery}₽`}
					onClick={() =>
						createPurchase(setIssues, props.setPurchase, deliveryMethod())
					}
				/>
			</Show>
		</>
	);
}
