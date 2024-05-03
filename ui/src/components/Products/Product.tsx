import type ProductInterface from "../../interfaces/product";
import apiURL from "../../utils/api";
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
								? `${apiURL}/files/${props.images[0].url}`
								: ""
						}
						alt=""
					/>
				</div>
			</a>
			<h1 class={styles.product__title}>{props.title}</h1>
		</section>
	);
}
