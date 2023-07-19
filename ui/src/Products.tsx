import axios from "axios";
import { For, createResource } from "solid-js";

import ProductImages from "./ProductImages";
import { Product } from "./types/product";


const getProducts = async (categorySlug: string) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/products/${categorySlug}/`)).data;

export default function Products(props: { categorySlug: string; }) {
	const [products] = createResource(props.categorySlug, getProducts);

	return (
		<div class="products">
			<For each={products()}>{(product: Product) =>
				<article class="product">
					<a class="product__link" href={`/product/${product.id}/`} aria-label={`Перейти на страницу товара: ${product.title}`}>
						<ProductImages productId={product.id} class="product__image" limit={1} />
						<h2 class="product__title">{product.title}</h2>
						<p class="product__price">{product.price}₽</p>
					</a>
				</article>
			}</For>
		</div>
	)
}
