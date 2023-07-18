import { type Component } from 'solid-js';

import BurgerMenu from './BurgerMenu';

const Index: Component = () => {
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

export default Index;
