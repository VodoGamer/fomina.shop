import { Match, Show, Switch, createResource } from "solid-js";

import { getSortedVariations } from "~/utils/variations";

import ProductInfo from "./ProductInfo";
import { getProduct } from "../../utils/products";
import "../../assets/animations.css";
import ErrorBox from "../ErrorBox";

export default function ProductDetails(props: { productId: number }) {
	const [product] = createResource(() => props.productId, getProduct);
	const [variations] = createResource(
		() => props.productId,
		getSortedVariations,
	);

	return (
		<Switch>
			<Match when={product.error || variations.error}>
				<ErrorBox message={"Не удалось загрузить товар"} />
			</Match>
			<Match when={product()}>
				{(product) => (
					<Show when={variations()}>
						{(variations) => (
							<ProductInfo product={product()} variations={variations()} />
						)}
					</Show>
				)}
			</Match>
		</Switch>
	);
}
