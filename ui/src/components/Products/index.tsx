import { For, Show, createResource } from "solid-js";

import { getProducts } from "~/utils/products";
import "~/assets/animations.css";

import { Loader } from "../Loader";
import Product from "./Product";

const Products = (props: { categoryId?: number }) => {
	const [products] = createResource(props.categoryId, getProducts);

	return (
		<>
			<Show when={products.loading}>
				<Loader />
			</Show>
			<div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				<Show
					when={!products.error}
					fallback={<p>Error... {products.error.message}</p>}
				>
					<For each={products()}>{(product) => <Product {...product} />}</For>
				</Show>
			</div>
		</>
	);
};

export default Products;
