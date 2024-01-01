import { Setter, Accessor } from "solid-js";

import ProductImages from "../ProductImages";
import { Product } from "../../types/product";
import cross from "../../../static/icons/cross.svg";

import styles from "./cartProduct.module.sass";

export default function CartProduct(props: {
	productIds: Accessor<string[]>;
	setProductIds: Setter<string[]>;
	product: Product;
}) {
	function deleteProductFromCart(productId: number) {
		const index = props.productIds().indexOf(String(productId));
		if (props.productIds().length == 1) {
			localStorage.removeItem("cartProducts");
			location.reload(); // refactor: veryyy bad code 💩
			return;
		}
		const newProducts = props.productIds().splice(index - 1, 1);
		localStorage.setItem("cartProducts", String(newProducts));
		props.setProductIds(newProducts);
	}

	return (
		<div class={styles.product}>
			<button class={styles.cross} onClick={() => deleteProductFromCart(props.product.id)}>
				<img src={cross} alt="" width="100%" />
			</button>
			<ProductImages productId={props.product.id} class={styles.image} limit={1} />
			<div>
				<a class={styles.title} href={`/product/${props.product.id}`}>
					{props.product.title}
				</a>
				<p class={styles.price}>{props.product.price}₽</p>
			</div>
		</div>
	);
}
