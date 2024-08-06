import {
	For,
	Match,
	type Setter,
	Show,
	Switch,
	createEffect,
	createResource,
} from "solid-js";

import { getProductVariations } from "../../utils/variations";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import VariationSelect from "./VariationSelect";
import styles from "./variationsSelector.module.sass";

export default function VariationsSelector(props: {
	productId: number;
	productPrice: number;
	setProductPrice: Setter<number | undefined>;
}) {
	const [variations] = createResource(props.productId, getProductVariations);

	createEffect(() => {
		if (variations()?.length) {
			props.setProductPrice(props.productPrice + getCurrentPriceMarkup());
		} else {
			props.setProductPrice(props.productPrice);
		}
	});

	function getCurrentPriceMarkup() {
		const target: HTMLSelectElement = document.forms[0]?.getElementsByTagName(
			"select",
		)?.[0] as HTMLSelectElement;
		const field = target.options[target.selectedIndex];
		const dataMarkup = field.dataset.price_markup;
		return Number(dataMarkup);
	}

	function SelectVariation() {
		const dataMarkup = getCurrentPriceMarkup();
		props.setProductPrice(props.productPrice + Number(dataMarkup));
	}

	return (
		<div>
			<form name="variations" class={styles.form}>
				<Show when={variations.loading}>
					<Loader />
				</Show>
				<Switch>
					<Match when={variations.error}>
						<ErrorBox message={"Ошибка получения вариаций товара"} />
					</Match>
					<Match when={variations()}>
						<For each={variations()}>
							{([key, variations]) => (
								<VariationSelect
									key={key}
									variations={variations}
									SelectVariation={SelectVariation}
								/>
							)}
						</For>
					</Match>
				</Switch>
			</form>
		</div>
	);
}
