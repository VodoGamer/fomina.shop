import { For } from "solid-js";

import type ProductInterface from "../../interfaces/product";
import apiURL from "../../utils/api";

import styles from "./productDetails.module.sass";

export default function ProductImages(props: { product?: ProductInterface }) {
	return (
		<div class={styles.images}>
			<For each={props.product?.images}>
				{(image) => (
					<a href={`${apiURL}/files/${image.original_url}`}>
						<img
							class={styles.image}
							src={`${apiURL}/files/${image.url}`}
							alt={image.description}
						/>
					</a>
				)}
			</For>
		</div>
	);
}
