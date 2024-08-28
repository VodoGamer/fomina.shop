import {
	type Accessor,
	For,
	type Setter,
	Show,
	createResource,
	createSignal,
} from "solid-js";

import type { PurchaseType } from "../../schemas/purchase";
import { getCities } from "../../utils/geonames";
import { createPurchase } from "../../utils/purchase";
import Button from "../Button";
import DeliveryServices from "../DeliveryServices";
import ErrorBox from "../ErrorBox";
import Input from "../Input";
import InputWithDropdown from "../InputWithDropdown";

export default function PurchaseForm(props: {
	sum: Accessor<number>;
	setPurchase: Setter<PurchaseType | undefined>;
}) {
	const [issues, setIssues] = createSignal<string[] | undefined>();
	const [cityText, setCityText] = createSignal<string>();
	const [cities] = createResource(cityText, getCities);
	const [cityChecked, setCityChecked] = createSignal<boolean>(false);

	return (
		<>
			<div class="grid md:grid-cols-2 gap-4">
				<form>
					<Input labelText="Ф.И.О" id="name" />
					<Input labelText="Номер телефона" id="phone_number" type="tel" />
					<Input labelText="Адрес электронной почты" id="email" type="email" />
					<InputWithDropdown
						labelText="Город"
						id="address"
						setInputText={setCityText}
						setChecked={setCityChecked}
						options={cities()?.geonames.map(
							(g) => `${g.name}, ${g.adminName1}, ${g.countryName}`,
						)}
					/>
					<Show when={cityChecked()}>
						<DeliveryServices />
					</Show>
				</form>
				<div class="grid gap-4">
					<For each={issues()}>{(issue) => <ErrorBox message={issue} />}</For>
				</div>
			</div>
			<Show when={cityChecked()}>
				<Button
					text={`Оформить заказ на ${props.sum()}₽`}
					onClick={() => createPurchase(setIssues, props.setPurchase)}
				/>
			</Show>
		</>
	);
}
