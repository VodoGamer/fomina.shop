import { type Component } from "solid-js";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";

import styles from "./index.module.sass";

const Index: Component = () => {
	return (
		<>
			<Header />
			<main class={styles.main}>
				<Hero />
			</main>
		</>
	);
};

export default Index;
