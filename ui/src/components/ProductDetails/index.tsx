import { Match, Show, Switch, createResource } from "solid-js";

import { getProduct } from "../../utils/products";
import { Loader } from "../Loader";
import styles from "./productDetails.module.css";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import "../../assets/animations.css";
import ErrorBox from "../ErrorBox";

export default function ProductDetails(props: { productId: number }) {
	const [product] = createResource(props.productId, getProduct);

	return (
		<>
			<Show when={product.loading}>
				<Loader />
			</Show>
			<Switch>
				<Match when={product.error}>
					<ErrorBox message={"Не удалось загрузить товар"} />
				</Match>
				<Match when={product()}>
					<div class={styles.product}>
						<ProductImages product={product()} />
						<ProductInfo product={product()} productId={props.productId} />
					</div>
				</Match>
			</Switch>
		</>
	);
}
