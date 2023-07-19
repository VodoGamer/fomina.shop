/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from "@solidjs/router";

import Index from './Index';
import Category from './Category';

const root = document.getElementById('app');

render(
	() => (
		<Router>
			<Routes>
				<Route path="/" component={Index} />
				<Route path="/category/:slug" component={Category} />
			</Routes>
		</Router>
	),
	root!
);
