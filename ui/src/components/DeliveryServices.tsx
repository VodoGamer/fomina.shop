import { Match, type Setter, Show, Switch, createSignal } from "solid-js";
import Input from "./Input";

enum DeliveryService {
	SDEK = "СДЭК",
	RussianPost = "Почта России",
}

export default function DeliveryServices() {
	const [service, setService] = createSignal<DeliveryService>();

	return (
		<form>
			<span class="font-bold block">Доставка</span>
			<div class="flex flex-wrap gap-4">
				<ServiceCheckbox
					service={DeliveryService.SDEK}
					setService={setService}
				/>
				<ServiceCheckbox
					service={DeliveryService.RussianPost}
					setService={setService}
				/>
			</div>
			<Show when={service()}>
				<Switch>
					<Match when={service() === DeliveryService.SDEK}>
						<Input
							labelText="Адрес доставки (улица, дом, квартира)"
							id="address"
						/>
					</Match>
				</Switch>
			</Show>
		</form>
	);
}

function ServiceCheckbox(props: {
	service: DeliveryService;
	setService: Setter<DeliveryService | undefined>;
}) {
	return (
		<label class="flex gap-1 items-center">
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
