import { Match, Switch, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";
import type ProductInterface from "../../interfaces/product";
import { SelectedVariation } from "../../interfaces/productVariation";
import { addToCart } from "../../utils/cart";
import Button from "../Button";
import styles from "./productDetails.module.sass";

import "../../assets/animations.sass";
import VariationsSelector from "../VariationsSelector";

export default function ProductInfo(props: {
	product?: ProductInterface;
	productId: number;
}) {
	let divRef!: HTMLDivElement;
	const [productInCart, setProductInCart] = createSignal(false);

	function getDescription(text: string) {
		const paragraphs = text.split("\n");
		const pTags = paragraphs.map((paragraph, index) => {
			return <p class={styles.description}>{paragraph}</p>;
		});
		return pTags;
	}

	function processAddToCart() {
		addToCart(props.productId, getVariations());
		setProductInCart(true);
	}

	function getVariations() {
		const variations: SelectedVariation[] = [];
		for (let i = 0; i < document.forms[0].length; i++) {
			const field = document.forms[0][i];
			const item: SelectedVariation = {
				key: field.name,
				value: field.value,
			};
			variations.push(item);
		}
		return variations;
	}

	return (
		<div class={styles.info}>
			<h1>{props.product?.title}</h1>
			<div ref={divRef}>
				<VariationsSelector variations={props.product?.variations} />
			</div>
			{getDescription(props.product?.description || "")}
			<span class={styles.price}>{props.product?.price}₽</span>
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
