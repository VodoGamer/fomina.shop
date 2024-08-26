import { For } from "solid-js";
import type ProductVariation from "../../interfaces/productVariation";

import styles from "./variationsSelector.module.sass";

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
				class="px-1 py-2 rounded-sm bg-gray-100 duration-100 hover:shadow-sm"
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
