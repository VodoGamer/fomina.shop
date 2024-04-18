import styles from "./hero.module.sass";

export default function Hero(props: { image: string; title?: string }) {
	return (
		<div class={styles.hero}>
			<h1 class={styles.hero__title}>{props.title}</h1>
			<img class={styles.hero__image} src={props.image} alt="" />
		</div>
	);
}
