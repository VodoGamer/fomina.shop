import { For } from "solid-js";

import type ProductInterface from "../../interfaces/product";
import { getCompressedImageUrl, getImageUrl } from "../../utils/images";

import styles from "./productDetails.module.sass";

export default function ProductImages(props: { product?: ProductInterface }) {
	return (
		<div class={styles.images}>
			<For each={props.product?.images}>
				{(image, index) => (
					<a href={`/product/${props.product?.id}/image/${index()}`}>
						<img
							class={styles.image}
							src={getCompressedImageUrl(getImageUrl(image.url))}
							alt={image.description || props.product?.title}
						/>
					</a>
				)}
			</For>
		</div>
	);
}
