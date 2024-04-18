import { Component } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

import Hero from "../components/Hero";
import Products from "../components/Products";
import hero_image from "../assets/hero.png";

const Home: Component = () => {
	return (
		<>
			<MetaProvider>
				<Title>Category page - Fomina</Title>
			</MetaProvider>
			<Hero image={hero_image} title="Category" />
			<Products />
		</>
	);
};

export default Home;
