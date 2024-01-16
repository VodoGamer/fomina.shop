import axios from "axios";
import { For, createResource } from "solid-js";

import { Image } from "../../types/image";

import styles from "./article.module.sass";

async function getImages(productId: Number) {
	const request = await axios.get<[Image]>(
		`${import.meta.env.VITE_BASE_API_URL}/images/${productId}`,
		{
			params: {
				limit: 1,
			},
		},
	);
	return request.data;
}

export default function ArticleImage(props: { productId: Number }) {
	const [images] = createResource(props.productId, getImages);

	return (
		<For
			each={images()}
			fallback={<div class={`${styles.image} ${styles.loading_animation}`}></div>}
		>
			{(image: Image) => (
				<div class={styles.image}>
					<img src={`/${image.path}`} alt={image.description} />
				</div>
			)}
		</For>
	);
}
