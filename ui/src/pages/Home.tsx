import { Component } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

import hero_image from "../assets/hero.png";
import Hero from "../components/Hero";

const Home: Component = () => {
	return (
		<>
			<MetaProvider>
				<Title>Home page - Fomina</Title>
			</MetaProvider>
			<Hero image={hero_image} />
		</>
	);
};

export default Home;
