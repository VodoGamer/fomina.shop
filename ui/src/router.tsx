/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from "@solidjs/router";

import Index from './pages/Index';
import Category from './pages/Category';
import Product from './pages/Product';

const root = document.getElementById('app');

render(
	() => (
		<Router>
			<Routes>
				<Route path="/" component={Index} />
				<Route path="/category/:slug" component={Category} />
				<Route path="/product/:productId/" component={Product} />
			</Routes>
		</Router>
	),
	root!
);
