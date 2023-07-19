import { type Component } from 'solid-js';

import Header from './Header';

const Index: Component = () => {
	return (
		<>
			<Header />
			<main class="main">
				<div class="first-look" style="background-image: url(/static/images/hello-image.webp);">
					<h1 class="first-look__header">Fomina style</h1>
				</div>
			</main>
		</>
	);
};

export default Index;
