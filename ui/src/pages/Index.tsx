import { type Component } from 'solid-js';

import Header from '../Header';

import hello_image from "../../static/images/hello-image.webp";

const Index: Component = () => {
	return (
		<>
			<Header />
			<main class="main">
				<div class="first-look" style={`background-image: url(${hello_image});`}>
					<div>
						<h1 class="first-look__header">Fomina style</h1>
						<span class="first-look__subheader">let it be...</span>
					</div>
				</div>
			</main>
		</>
	);
};

export default Index;
