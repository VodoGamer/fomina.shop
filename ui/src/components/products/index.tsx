import styles from "./products.module.css";

export default function Products() {
	return (
		<main>
			<div class={styles.products}>
				<a href="/product/1" class={styles.product}>
					<img class={styles.image} src="" />
					<h2 class={styles.title}>Product</h2>
				</a>
			</div>
		</main>
	);
}
