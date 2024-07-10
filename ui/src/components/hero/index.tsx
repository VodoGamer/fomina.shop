import styles from "./hero.module.css";

export default function Hero() {
	return (
		<section class={styles.hero}>
			<img class={styles.image} alt="" />
			<h1>Fomina Style</h1>
		</section>
	);
}
