import { Component } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";

const Home: Component = () => {
	return (
		<>
			<MetaProvider>
				<Title>Home page - Fomina</Title>
			</MetaProvider>
			<h1>Home page</h1>
		</>
	);
};

export default Home;
