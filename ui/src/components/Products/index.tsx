import { For, Show, createResource } from "solid-js";

import Product from "./Product";
import { getProducts } from "../../utils/products";
import { Loader } from "../Loader";

import styles from "./products.module.sass";
import "../../assets/animations.sass";

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
