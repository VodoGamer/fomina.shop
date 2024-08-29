import { For, Match, Show, Switch, createResource } from "solid-js";
import type ProductInterface from "../../interfaces/product";
import type { CartItem } from "../../utils/cart";
import { getCompressedImageUrl } from "../../utils/images";
import Button from "../Button";

import type { CartStore } from "../../interfaces/cart";
import type ProductVariation from "../../interfaces/productVariation";
import { getVariations } from "../../utils/variations";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import styles from "./assets/cartItems.module.css";
import menu_cross from "./assets/menu_cross_white.svg";

export default function CartProduct(props: {
	product: ProductInterface;
	deleteFromCart: (id: number) => void;
	index: number;
	cart: CartItem[];
	addToSum: (item: CartStore) => void;
}) {
	const cartInfo: CartItem = props.cart[props.index];
	const [variations] = createResource(
		cartInfo.variations.length ? cartInfo.variations : [0],
		getVariations,
	);

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
				<Show
					fallback={
						<CartProductPrice
							productPrice={props.product.price}
							count={cartInfo.count}
							index={props.index}
							addToSum={props.addToSum}
						/>
					}
					when={cartInfo.variations.length}
				>
					<Show when={variations.loading}>
						<Loader />
					</Show>
					<Switch>
						<Match when={variations.error}>
							<ErrorBox message={"Не удалось загрузить вариации"} />
						</Match>
						<Match when={variations()}>
							<CartProductPrice
								productPrice={props.product.price}
								count={cartInfo.count}
								variations={variations()}
								index={props.index}
								addToSum={props.addToSum}
							/>
							<For each={variations()}>
								{(variation) => (
									<p>
										{variation.key} - {variation.value}
									</p>
								)}
							</For>
						</Match>
					</Switch>
				</Show>
				<p>Количество - {cartInfo.count || 1}</p>
				<Button
					text="Сведения о товаре"
					link={`/product/${props.product.id}`}
				/>
			</div>
		</section>
	);
}

function CartProductPrice(props: {
	productPrice: number;
	count: number;
	index: number;
	addToSum: (price: CartStore) => void;
	variations?: ProductVariation[];
}) {
	if (!props.variations) {
		const price: number = props.productPrice * (props.count || 1);
		props.addToSum({ price: price, index: props.index });
		return <p>{price}₽</p>;
	}
	const variationSum = props.variations.reduce((a, b) => a + b.price_markup, 0);
	const price: number =
		(props.productPrice + variationSum) * (props.count || 1);
	props.addToSum({ price: price, index: props.index });
	return <p>{price}₽</p>;
}
