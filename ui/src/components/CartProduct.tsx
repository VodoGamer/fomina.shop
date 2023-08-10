import ProductImages from "../ProductImages";
import { Product } from "../types/product";

const displayVariations = (rawText: string) => {
	const paragraphs = rawText.split('\n');
	return paragraphs.map((paragraph) => <p class="cart-product__variation">{paragraph}</p>);
}

export default function CartProduct(props: { product: Product }) {
	return (
		<div class="cart-product">
			<ProductImages productId={props.product.id} class="cart-product__image" limit={1} />
			<div class="cart-product__texts">
				<h2 class="cart-product__title">{props.product.title}</h2>
				{displayVariations("123")}
				{/* TODO: product variations */}
				<p class="cart-product__price">{props.product.price}₽</p>
			</div>
		</div>
	)
}
