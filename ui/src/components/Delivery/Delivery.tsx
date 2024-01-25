import axios from "axios";
import { Component, For, Show, createResource, createSignal } from "solid-js";

import { DeliveryCity } from "../../types/delivery_city";
import { DeliveryOffice } from "../../types/delivery_office";
import { DeliveryCountry } from "../../types/delivery";
import { TariffCode } from "../../types/delivery_price";

import styles from "./styles.module.sass";

async function getCountries() {
	const result = (
		await axios.get<DeliveryCountry[]>(`${import.meta.env.VITE_BASE_API_URL}/countries`)
	).data;
	return result;
}

async function getCities(countryCode: string) {
	const result = (
		await axios.get<DeliveryCity[]>(`${import.meta.env.VITE_BASE_API_URL}/city`, {
			params: {
				country_codes: countryCode,
			},
		})
	).data;
	return result;
}

async function getOffices(cityCode: string) {
	const result = (
		await axios.get<DeliveryOffice[]>(`${import.meta.env.VITE_BASE_API_URL}/delivery_points`, {
			params: {
				city_code: cityCode,
			},
		})
	).data;
	return result;
}

export async function getDeliveryVariations(toOfficeCode: string) {
	return (
		await axios.get<TariffCode[]>(`${import.meta.env.VITE_BASE_API_URL}/calculate`, {
			params: {
				from_office_code: "MSK1125",
				to_office_code: toOfficeCode,
				weight: 250,
			},
		})
	).data;
}

export async function getDeliveryPrice(toOfficeCode: string) {
	const deliveryVariations = await getDeliveryVariations(toOfficeCode);
	console.log(deliveryVariations);
	const delivery = deliveryVariations.find((variation) => variation.tariff_code === 480);
	if (delivery) {
		return delivery.delivery_sum;
	} else {
		return 0;
	}
}

export const [officeCode, setOfficeCode] = createSignal<string>();

const Delivery: Component = () => {
	const [counties] = createResource(getCountries);
	const [countryCode, setCountryCode] = createSignal<string>();
	const [cities] = createResource(countryCode, getCities);
	const [cityCode, setCityCode] = createSignal<string>();
	const [offices] = createResource(cityCode, getOffices);

	return (
		<div class={styles.grid}>
			<div>
				<label for="country" class={styles.label}>
					Страна доставки:
				</label>
				<input
					onInput={(e) => setCountryCode(e.currentTarget.value.slice(-3, -1))}
					type="text"
					list="country"
					class={styles.input}
				/>
				<datalist id="country">
					<Show when={!counties.error}>
						<For each={counties()}>
							{(country) => (
								<option>
									{country.country} ({country.country_code})
								</option>
							)}
						</For>
					</Show>
				</datalist>
			</div>
			<div>
				<label for="city" class={styles.label}>
					Город доставки:
				</label>
				<input
					onInput={(e) => setCityCode(e.currentTarget.value.split("(")[1].split(")")[0])}
					type="text"
					list="city"
					class={styles.input}
				/>
				<datalist id="city">
					<Show when={!cities.error}>
						<For each={cities()}>
							{(city) => (
								<option>
									{city.city} ({city.code})
								</option>
							)}
						</For>
					</Show>
				</datalist>
			</div>
			<Show when={cityCode()}>
				<div>
					<label for="city" class={styles.label}>
						СДЭК Пункт доставки:
					</label>
					<form>
						<fieldset class={styles.fieldset}>
							<Show when={!offices.error}>
								<For each={offices()}>
									{(office) => (
										<div>
											<input
												type="radio"
												name="office"
												value={office.code}
												onClick={() => setOfficeCode(office.code)}
												class={styles.input}
											/>
											<label for={office.code}>{office.location.address}</label>
										</div>
									)}
								</For>
							</Show>
						</fieldset>
					</form>
				</div>
			</Show>
		</div>
	);
};

export default Delivery;
