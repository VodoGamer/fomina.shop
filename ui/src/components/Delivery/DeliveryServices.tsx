import {
	type Accessor,
	type JSX,
	Match,
	type Setter,
	Switch,
	createEffect,
	createResource,
	createSignal,
	splitProps,
} from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

import type { SdekCalculateRequest } from "~/interfaces/sdek";
import { calculateSdekDelivery } from "~/utils/delivery";

import Input from "../Input";
import type { purchaseSumStore } from "../purchase";
import { DeliveryMethod } from "../PurchaseForm";
import DeliveryPeriod from "./DeliveryPeriod";
import SdekPoints from "./SdekPoints";

export default function DeliveryServices(props: {
	deliveryMethod: Accessor<DeliveryMethod | undefined>;
	setDeliveryMethod: Setter<DeliveryMethod | undefined>;
	setSumStore: SetStoreFunction<purchaseSumStore>;
	city?: string;
}) {
	const [address, setAddress] = createSignal<string>();

	function deliveryProps(): SdekCalculateRequest | undefined {
		if (!address()) return undefined;
		return {
			is_courier: props.deliveryMethod() === DeliveryMethod.SDEK_COURIER,
			to_address: `${props.city} ${address()}`,
			count: 1,
		};
	}

	const [deliveryInfo] = createResource(deliveryProps, calculateSdekDelivery);

	createEffect(() => {
		if (deliveryInfo.error) return;
		const info = deliveryInfo();
		if (info) {
			props.setSumStore("delivery", info.total_sum);
		}
	});

	function resetDelivery() {
		createEffect(() => {
			props.setSumStore("delivery", 0);
		});
	}

	return (
		<form>
			<span class="block font-bold">Доставка</span>
			<div class="flex flex-wrap gap-4">
				<ServiceCheckbox
					service={DeliveryMethod.SDEK}
					setService={props.setDeliveryMethod}
					onClick={resetDelivery}
				/>
				<ServiceCheckbox
					service={DeliveryMethod.SDEK_COURIER}
					setService={props.setDeliveryMethod}
					onClick={resetDelivery}
				/>
				{/* <ServiceCheckbox
					service={DeliveryService.RussianPost}
					setService={setService}
				/> */}
			</div>
			<div class="mb-6">
				<Switch>
					<Match when={props.deliveryMethod() === DeliveryMethod.SDEK_COURIER}>
						<Input
							labelText="Адрес доставки (улица, дом, квартира)"
							id="address"
							onChange={(e) => setAddress(e.target.value)}
							onInput={resetDelivery}
						/>
					</Match>
					<Match when={props.deliveryMethod() === DeliveryMethod.SDEK}>
						<SdekPoints city={props.city} setAddress={setAddress} />
					</Match>
				</Switch>
			</div>
			<DeliveryPeriod deliveryInfo={deliveryInfo} />
		</form>
	);
}

function ServiceCheckbox(
	props: {
		service: DeliveryMethod;
		setService: Setter<DeliveryMethod | undefined>;
	} & JSX.HTMLAttributes<HTMLLabelElement>,
) {
	const [, others] = splitProps(props, ["service", "setService"]);

	return (
		<label class="flex items-center gap-1" {...others}>
			{props.service}
			<input
				type="radio"
				name="delivery"
				value={props.service}
				onChange={() => props.setService(props.service)}
			/>
		</label>
	);
}
