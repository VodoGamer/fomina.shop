import { type Component } from "solid-js";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";

import styles from "./index.module.sass";
import hero_image from "./index-image.webp";
import SocialButtons from "../../components/SocialButtons/SocialButtons";

const Index: Component = () => {
	return (
		<>
			<Header />
			<main class={styles.main}>
				<Hero header="Fomina Style" background_image_url={hero_image} subheader="let it be..." />
			</main>
			<SocialButtons />
		</>
	);
};

export default Index;
