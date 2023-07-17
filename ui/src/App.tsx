import { onMount, type Component } from 'solid-js';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

import Brands from './Brands';


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
				<img class="header__logo" width="299" src="/static/icons/fomina-logo.svg" alt="" />
			</header>
			<main class="main">
				<div class="hello">
					<h1 class="hello__header">Вселенная “Fomina” для:</h1>
					<section class="splide" aria-labelledby="carousel-heading">
						<div class="splide__track">
							<ul class="splide__list">
								<li class="splide__slide hello__subheader">креативных🤠</li>
								<li class="splide__slide hello__subheader">стильных</li>
							</ul>
						</div>
					</section>
				</div>
				<Brands></Brands>
				<div class="social">
					<h4 class="social__header">Не упускайте возможность!🤯</h4>
					<p class="social__paragraph">подпишитесь на наши <a class="social__link" href="">соц сети😏</a></p>
				</div>
			</main>
		</>
	);
};

export default App;
