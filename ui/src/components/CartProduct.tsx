import ProductImages from "./ProductImages";
import { Product } from "../types/product";
import cross from "../../static/icons/cross.svg";
import { Show, createSignal } from "solid-js";

export default function CartProduct(props: { product: Product }) {
	const [product, setProduct] = createSignal<Product | null>(props.product);

	function deleteProductFromCart(productId: number) {
		setProduct(null);
		let currentCart = localStorage.getItem("cartProducts")?.split(",");
		if (currentCart == undefined) { return; }
		if (currentCart?.length > 1) {
			const index = currentCart?.indexOf(String(productId));
			currentCart?.splice(index, 1);
			localStorage.setItem("cartProducts", String(currentCart));
		} else {
			localStorage.removeItem("cartProducts");
		};
	}

	return (
		<Show when={product()}>
			<div class="cart-product">
				<button class="cart-product__cross" onClick={() => deleteProductFromCart(product().id)}>
					<img src={cross} alt="" width="100%" />
				</button>
				<ProductImages productId={product()?.id} class="cart-product__image" limit={1} />
				<div class="cart-product__texts">
					<a class="cart-product__title" href={`/product/${product()?.id}`}>{product()?.title}</a>
					<p class="cart-product__price">{product()?.price}₽</p>
				</div>
			</div>
		</Show>
	)
}
