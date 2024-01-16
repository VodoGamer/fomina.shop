import axios from "axios";
import { For, Show, createResource } from "solid-js";

import { Product } from "../../types/product";
import Article from "../Article/Article";

import styles from "./articles.module.sass";

const getProducts = async (categorySlug: string) =>
	(await axios.get<[Product]>(`${import.meta.env.VITE_BASE_API_URL}/products/${categorySlug}/`))
		.data;

export default function ArticlesList(props: { categorySlug: string }) {
	const [products] = createResource(props.categorySlug, getProducts);

	return (
		<div class={styles.articles}>
			<Show fallback={<h2>Произошла ошибка при загрузке товаров :(</h2>} when={!products.error}>
				<For fallback={<h2>Загружаем товары...</h2>} each={products()}>
					{(product: Product) => <Article product={product} />}
				</For>
			</Show>
		</div>
	);
}
