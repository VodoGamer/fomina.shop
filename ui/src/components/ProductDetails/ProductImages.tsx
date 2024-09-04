import { For } from "solid-js";

import type ProductInterface from "../../interfaces/product";
import { getCompressedImageUrl } from "../../utils/images";

import styles from "./productDetails.module.css";

export default function ProductImages(props: { product?: ProductInterface }) {
	return (
		<div class="grid grid-cols-2 gap-4 sm:gap-6">
			<For each={props.product?.images}>
				{(image, index) => (
					<a href={`/product/${props.product?.id}/image/${index()}`}>
						<img
							class={styles.image}
							src={getCompressedImageUrl(image.url)}
							alt={image.description || props.product?.title}
						/>
					</a>
				)}
			</For>
		</div>
	);
}
