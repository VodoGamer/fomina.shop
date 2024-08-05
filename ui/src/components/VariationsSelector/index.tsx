import {
	createResource,
	createSignal,
	For,
	Match,
	Setter,
	Show,
	Switch,
} from "solid-js";

import styles from "./variationsSelector.module.sass";
import { getProductVariations } from "../../utils/api/variations";
import VariationSelect from "./VariationSelect";
import Error from "../ErrorBox";
import { Loader } from "../Loader";

export default function VariationsSelector(props: {
	productId: number;
	setProductPrice: Setter<number>;
}) {
	const [variations] = createResource(props.productId, getProductVariations);
	const [priceBuffer, setPriceBuffer] = createSignal(NaN);

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
						<Error message={"Ошибка получения вариаций товара"} />
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
