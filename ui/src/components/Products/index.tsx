import { For, Show, createResource } from "solid-js";

import "~/assets/animations.css";

import { getProducts } from "~/utils/products";

import Product from "./Product";
import ErrorBox from "../ErrorBox";

const Products = (props: { categoryId: number }) => {
	const [products] = createResource(() => props.categoryId, getProducts);

	return (
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			<Show
				when={!products.error}
				fallback={<ErrorBox message="Не удалось загрузить продукты" />}
			>
				<For each={products()}>{(product) => <Product {...product} />}</For>
			</Show>
		</div>
	);
};

export default Products;
