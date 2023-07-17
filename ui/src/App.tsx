import { onMount, type Component } from 'solid-js';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

import BurgerMenu from './BurgerMenu';

const App: Component = () => {
	onMount(() => {
		new Splide('.splide', {
			direction: 'ttb',
			height: '100px',
			autoHeight: true,
			arrows: false,
			pagination: false,
			autoplay: true,
			type: "loop",
			interval: 2000,
		}).mount();
	});
	return (
		<>
			<header class="header">
				<BurgerMenu />
				<img class="header__logo" width="284" src="/static/icons/fomina-logo.svg" alt="" />
			</header>
			<main class="main">
				<div class="hello">
					<h1 class="hello__header">Fomina style</h1>
				</div>
			</main>
		</>
	);
};

export default App;
