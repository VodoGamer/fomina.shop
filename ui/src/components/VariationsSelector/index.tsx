import {
	For,
	Match,
	type Setter,
	Show,
	Switch,
	createResource,
	createSignal,
} from "solid-js";

import { getProductVariations } from "../../utils/variations";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import VariationSelect from "./VariationSelect";
import styles from "./variationsSelector.module.sass";

export default function VariationsSelector(props: {
	productId: number;
	setProductPrice: Setter<number>;
}) {
	const [variations] = createResource(props.productId, getProductVariations);
	const [priceBuffer, setPriceBuffer] = createSignal(Number.NaN);

	function addMarkup(markup: number) {
		if (!priceBuffer()) {
			props.setProductPrice((prev) => {
				setPriceBuffer(prev);
				return prev;
			});
		}
		props.setProductPrice(priceBuffer() + markup);
	}

	function SelectVariation(e: Event & { target: HTMLSelectElement }) {
		const field = e.target.options[e.target.options.selectedIndex];
		const dataMarkup = field.dataset.price_markup;
		addMarkup(Number(dataMarkup || 0));
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
