import styles from "./assets/products.module.sass";

export default function Product(props: { title: string; image: string }) {
	return (
		<section>
			<a href="#">
				<img class={styles.product__image} src={props.image} alt="" />
			</a>
			<h1 class={styles.product__title}>{props.title}</h1>
		</section>
	);
}
