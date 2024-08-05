import { createResource, For } from "solid-js";
import type ProductInterface from "../../interfaces/product";
import { CartItem } from "../../utils/cart";
import { getCompressedImageUrl } from "../../utils/images";
import Button from "../Button";

import styles from "./assets/cartItems.module.sass";
import menu_cross from "./assets/menu_cross_white.svg";
import { getVariation } from "../../utils/api";

export default function CartProduct(props: {
	product: ProductInterface;
	deleteFromCart: (id: number) => void;
	index: number;
	cart: CartItem[];
	addToSum: (price: number) => void;
}) {
	const cartInfo: CartItem = props.cart[props.index];
	const price: number = props.product.price * (cartInfo.count || 1);
	const [variationInfo] = createResource(
		cartInfo.variations[0].id,
		getVariation,
	);
	props.addToSum(price);

	return (
		<section class={styles.product}>
			<div
				class={styles.image}
				style={{
					"background-image": `url(${
						props.product.images?.length
							? getCompressedImageUrl(props.product.images[0].url)
							: ""
					})`,
				}}
			>
				<button
					class={styles.remove_button}
					onClick={() => props.deleteFromCart(props.index)}
					type="button"
				>
					<img class={styles.remove_icon} src={menu_cross} alt="" />
				</button>
			</div>
			<div class={styles.info}>
				<h1>{props.product.title}</h1>
				<p>{price}₽</p>
				<For each={cartInfo.variations || []}>
					{(variation) => (
						<p>
							{variation.key} - {variation.key}
						</p>
					)}
				</For>
				<p>Количество - {cartInfo.count || 1}</p>
				<Button
					text="Сведения о товаре"
					link={`/product/${props.product.id}`}
				/>
			</div>
		</section>
	);
}
