import { onMount, type Component } from 'solid-js';

const Brands: Component = () => {
	return (
		<div class="brands">
			<h2 class="brands__header">У нас найдётся одежда для всех:</h2>
			<article class="brand">
				<a class="brand__link" href="">
					<h3 class="brand__title">Для самых мечтательных</h3>
					<img class="brand__image" width="100%" src="/static/images/fomina-kids.jpg" alt="" />
				</a>
			</article>
		</div>
	);
}

export default Brands;
