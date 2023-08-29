import ProductImages from "./ProductImages";
import { Product } from "../types/product";
import cross from "../../static/icons/cross.svg";
import { Setter, Accessor } from "solid-js";

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
		<div class="cart-product">
			<button class="cart-product__cross" onClick={() => deleteProductFromCart(props.product.id)}>
				<img src={cross} alt="" width="100%" />
			</button>
			<ProductImages productId={props.product.id} class="cart-product__image" limit={1} />
			<div class="cart-product__texts">
				<a class="cart-product__title" href={`/product/${props.product.id}`}>
					{props.product.title}
				</a>
				<p class="cart-product__price">{props.product.price}₽</p>
			</div>
		</div>
	);
}
