import ProductImages from "../ProductImages";
import { Product } from "../../types/product";
import cross from "../../../static/icons/cross.svg";
import { removeFromCart } from "./CartLogic";

import styles from "./cartProduct.module.sass";
import { Show, createResource } from "solid-js";
import axios from "axios";
import { ProductIndex, addProductToStore } from "../../pages/cart/Cart";

type props = { index: number; productId: number };

async function getProduct(props: props): Promise<Product> {
	const request = await axios.get<ProductIndex>(
		`${import.meta.env.VITE_BASE_API_URL}/product/${props.productId}`,
	);
	request.data.index = props.index;
	addProductToStore(request.data);
	return request.data;
}

export default function CartProduct(props: props) {
	const [product] = createResource(props, getProduct);

	return (
		<Show when={!product.error} fallback={<p>При загрузке этого товара произошла ошибка</p>}>
			<Show when={product()}>
				<div class={styles.product}>
					<button class={styles.cross} onClick={() => removeFromCart(props.index)}>
						<img src={cross} alt="" width="100%" />
					</button>
					<ProductImages productId={props.productId} class={styles.image} limit={1} />
					<div>
						<a class={styles.title} href={`/product/${props.productId}`}>
							{product()?.title}
						</a>
						<p class={styles.price}>{product()?.price}₽</p>
					</div>
				</div>
			</Show>
		</Show>
	);
}
