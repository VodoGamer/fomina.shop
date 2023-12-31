import { Product } from "../../types/product";

import ArticleImage from "./ArticleImage";

import styles from "./article.module.sass";

export default function ArticlesList(props: { product: Product }) {
	return (
		<article class={styles.article}>
			<a
				class={styles.link}
				href={`/product/${props.product.id}/`}
				aria-label={`Перейти на страницу товара: ${props.product.title}`}
			>
				<ArticleImage productId={props.product.id} />
				<h2 class={styles.title}>{props.product.title}</h2>
				<p class={styles.price}>{props.product.price}₽</p>
			</a>
		</article>
	);
}
