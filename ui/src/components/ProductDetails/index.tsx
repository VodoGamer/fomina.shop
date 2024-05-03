import { Match, Show, Switch, createResource } from "solid-js";
import { Transition } from "solid-transition-group";

import type ProductInterface from "../../interfaces/product";
import { getFromApi } from "../../utils/api";

import { Loader } from "../Loader";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

import styles from "./productDetails.module.sass";
import "../../assets/animations.sass";

async function getProduct(id: number): Promise<ProductInterface> {
	return (await getFromApi(`product/${id}`)).data;
}

export default function ProductDetails(props: { productId: number }) {
	const [product] = createResource(props.productId, getProduct);

	return (
		<>
			<Show when={product.loading}>
				<Loader />
			</Show>
			<Transition mode="outin" name="slide-fade">
				<Switch>
					<Match when={product.error}>
						<p>Error... {product.error.message}</p>
					</Match>
					<Match when={product()}>
						<div class={styles.product}>
							<ProductImages product={product()} />
							<ProductInfo product={product()} productId={props.productId} />
						</div>
					</Match>
				</Switch>
			</Transition>
		</>
	);
}
