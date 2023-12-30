import { type Component } from "solid-js";

import hero_image from "./hero-image.webp";
import styles from "./hero.module.sass";

const Hero: Component = () => {
	return (
		<>
			<div class={styles.hero} style={`background-image: url(${hero_image});`}>
				<div>
					<h1 class={styles.header}>Fomina style</h1>
					<span class={styles.subheader}>let it be...</span>
				</div>
			</div>
		</>
	);
};

export default Hero;
