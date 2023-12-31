import styles from "./hero.module.sass";

export default function Hero(props: {
	header: string;
	background_image_url: string;
	subheader?: string;
}) {
	return (
		<>
			<div class={styles.hero} style={`background-image: url(${props.background_image_url});`}>
				<div>
					<h1 class={styles.header}>{props.header}</h1>
					<span class={styles.subheader}>{props.subheader}</span>
				</div>
			</div>
		</>
	);
}
