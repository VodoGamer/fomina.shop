import { type Component } from 'solid-js';

import Header from '../Header';

import hello_image from "../../static/images/hello-image.webp";

const Index: Component = () => {
	return (
		<>
			<Header />
			<main class="main">
				<div class="first-look" style={`background-image: url(${hello_image});`}>
					<h1 class="first-look__header">Fomina style</h1>
				</div>
			</main>
		</>
	);
};

export default Index;
