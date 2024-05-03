import type ProductInterface from "../../interfaces/product";
import apiURL from "../../utils/api";
import Button from "../Button";

import styles from "./assets/cartItems.module.sass";
import menu_cross from "./assets/menu_cross_white.svg";

export default function CartProduct(props: {
	product: ProductInterface;
	deleteFromCart: (id: number) => void;
	index: number;
}) {
	return (
		<section class={styles.product}>
			<div
				class={styles.image}
				style={{
					"background-image": `url(${
						props.product.images?.length
							? `${apiURL}/files/${props.product.images[0].url}`
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
				<p>{props.product.price}₽</p>
				<Button
					text="Сведения о товаре"
					link={`/product/${props.product.id}`}
				/>
			</div>
		</section>
	);
}
