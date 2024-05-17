import type ProductInterface from "../../interfaces/product";
import { getCompressedImageUrl, getImageUrl } from "../../utils/images";
import styles from "./products.module.sass";

export default function Product(props: ProductInterface) {
	return (
		<section>
			<a href={`/product/${props.id}`}>
				<div class={styles.image__block}>
					<img
						class={styles.image}
						src={
							props.images?.length && props.images[0]
								? getCompressedImageUrl(getImageUrl(props.images[0].url))
								: ""
						}
						alt={props.images[0].description || props.title}
					/>
				</div>
			</a>
			<h1 class={styles.product__title}>{props.title}</h1>
		</section>
	);
}
