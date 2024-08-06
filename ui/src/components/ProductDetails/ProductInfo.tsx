import { Match, Show, Switch, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import type ProductInterface from "../../interfaces/product";
import { addToCart } from "../../utils/cart";
import Button from "../Button";
import styles from "./productDetails.module.sass";
import "../../assets/animations.sass";
import { getVariations } from "../../utils/forms";
import { getDescription } from "../../utils/products";
import { Loader } from "../Loader";
import VariationsSelector from "../VariationsSelector";

export default function ProductInfo(props: {
	product?: ProductInterface;
	productId: number;
}) {
	if (!props.product) {
		return null;
	}

	const [productInCart, setProductInCart] = createSignal(false);
	const [productPrice, setProductPrice] = createSignal<number | undefined>(
		undefined,
	);

	function processAddToCart() {
		addToCart(props.productId, getVariations());
		setProductInCart(true);
	}

	if (!props.product) {
		return null;
	}

	return (
		<div class={styles.info}>
			<h1>{props.product.title}</h1>
			<VariationsSelector
				productId={props.productId}
				productPrice={props.product.price}
				setProductPrice={setProductPrice}
			/>
			{getDescription(props.product.description, styles.description)}
			<span class={styles.price}>
				Цена:{" "}
				<Show fallback={<Loader />} when={productPrice()}>
					{productPrice()}₽
				</Show>
			</span>
			<Transition mode="outin" name="slide-fade">
				<Switch>
					<Match when={!productInCart()}>
						<Button text="Добавить в корзину" onClick={processAddToCart} />
					</Match>
					<Match when={productInCart()}>
						<Button
							text="Перейти в корзину"
							link="/cart"
							style={{ "background-color": "#DDFFC2" }}
						/>
					</Match>
				</Switch>
			</Transition>
		</div>
	);
}
