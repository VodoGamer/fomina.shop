/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from "@solidjs/router";

import Index from './pages/Index';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Purchase from './pages/Purchase';
import Payment from './pages/Payment';

const root = document.getElementById('app');

render(
	() => (
		<Router>
			<Routes>
				<Route path="/" component={Index} />
				<Route path="/category/:slug" component={Category} />
				<Route path="/product/:productId/" component={Product} />
				<Route path="/cart/" component={Cart} />
				<Route path="/purchase/" component={Purchase} />
				<Route path="/payment/:id/" component={Payment} />
			</Routes>
		</Router>
	),
	root!
);
