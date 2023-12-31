import { Product as ProductModel } from "../../types/product";

import AddToCartButton from "../Cart/AddToCartButton";
import ProductImages from "../ProductImages";

import styles from "./product.module.sass";

const displayDescription = (rawText: string) => {
	const paragraphs = rawText.split("\n");
	return paragraphs.map((paragraph) => <p class={styles.description}>{paragraph}</p>);
};

export default function Product(props: { product: ProductModel }) {
	return (
		<>
			<div class={styles.product}>
				<ProductImages productId={props.product.id} class={styles.image} limit={1} />
				<div>
					<h1 class={styles.title}>{props.product.title}</h1>
					{displayDescription(props.product.description)}
					<p class={styles.price}>{props.product.price}₽</p>
					<AddToCartButton productId={props.product.id} />
				</div>
			</div>
		</>
	);
}
