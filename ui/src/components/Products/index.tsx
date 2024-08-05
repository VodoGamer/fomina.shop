import { For, Show, createResource } from "solid-js";

import type ProductInterface from "../../interfaces/product";
import Product from "./Product";

import { getFromApi } from "../../utils/api/base";
import { Loader } from "../Loader";
import styles from "./products.module.sass";
import "../../assets/animations.sass";
import { TransitionGroup } from "solid-transition-group";

async function getProducts(categoryId: number): Promise<ProductInterface[]> {
	const response = await getFromApi(`products/category/${categoryId}`);
	return response.data;
}

const Products = (props: { categoryId?: number }) => {
	const [products] = createResource(props.categoryId, getProducts);

	return (
		<>
			<Show when={products.loading}>
				<Loader />
			</Show>
			<div class={styles.products}>
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
