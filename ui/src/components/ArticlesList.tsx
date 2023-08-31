import axios from "axios";
import { For, Show, createResource } from "solid-js";

import { Product } from "../types/product";
import ArticleImage from "./ArticleImage";

const getProducts = async (categorySlug: string) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/products/${categorySlug}/`)).data;

export default function ArticlesList(props: { categorySlug: string }) {
	const [products] = createResource(props.categorySlug, getProducts);

	return (
		<div class="articles">
			<Show fallback={<h2>Произошла ошибка при загрузке товаров :(</h2>} when={!products.error}>
				<For fallback={<h2>Загружаем товары...</h2>} each={products()}>
					{(product: Product) => (
						<article class="article">
							<a
								class="article__link"
								href={`/product/${product.id}/`}
								aria-label={`Перейти на страницу товара: ${product.title}`}
							>
								<ArticleImage productId={product.id} />
								<h2 class="article__title">{product.title}</h2>
								<p class="article__price">{product.price}₽</p>
							</a>
						</article>
					)}
				</For>
			</Show>
		</div>
	);
}
