import { For } from "solid-js";

import styles from "./variationsSelector.module.css";
import type ProductVariation from "../../interfaces/productVariation";

export default function VariationSelect(props: {
	key: string;
	SelectVariation: () => void;
	variations: ProductVariation[];
}) {
	return (
		<p class={styles.field}>
			<label class={styles.label} for={`${props.key}-select`}>
				{props.key}
			</label>
			<select
				name={props.key}
				class="rounded-sm bg-gray-100 px-1 py-2 duration-100 hover:shadow-sm"
				id={`${props.key}-select`}
				onChange={props.SelectVariation}
			>
				<For each={props.variations}>
					{(variation) => (
						<option
							value={variation.value}
							id={String(variation.id)}
							data-price_markup={variation.price_markup}
						>
							{variation.value}
						</option>
					)}
				</For>
			</select>
		</p>
	);
}
