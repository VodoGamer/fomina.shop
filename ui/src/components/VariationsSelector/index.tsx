import { For } from "solid-js";
import ProductVariation from "../../interfaces/productVariation";

import styles from "./variationsSelector.module.sass";

export default function VariationSelector(props: {
	variations: ProductVariation[] | undefined;
}) {
	if (!props.variations) {
		return null;
	}

	let variationsByKey: { [key: string]: ProductVariation[] } = {};
	for (const variation of props.variations) {
		if (!variationsByKey[variation.key]) {
			variationsByKey[variation.key] = [];
		}
		variationsByKey[variation.key].push(variation);
	}

	return (
		<form name="variations" class={styles.form}>
			<For each={Object.entries(variationsByKey)}>
				{([key, variations]) => (
					<p class={styles.field}>
						<label class={styles.label} for={`${key}-select`}>
							{key}
						</label>
						<select name={key} id={`${key}-select`}>
							<For each={variations}>
								{(variation) => (
									<option value={variation.value}>{variation.value}</option>
								)}
							</For>
						</select>
					</p>
				)}
			</For>
		</form>
	);
}
