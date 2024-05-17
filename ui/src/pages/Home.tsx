import { MetaProvider, Title } from "@solidjs/meta";
import type { Component } from "solid-js";

import hero_image from "../assets/hero.webp";
import Hero from "../components/Hero";

const Home: Component = () => {
	return (
		<>
			<MetaProvider>
				<Title>Свободная одежда для всей семьи - Fomina Style</Title>
			</MetaProvider>
			<Hero image={hero_image} />
			<h1 style={{ "margin-top": "24px" }}>Fomina Style</h1>
		</>
	);
};

export default Home;
