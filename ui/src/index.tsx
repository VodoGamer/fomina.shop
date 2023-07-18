/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, Routes } from "@solidjs/router";

import Main from './main';
import Category from './category';

const root = document.getElementById('app');

render(
	() => (
		<Router>
			<Routes>
				<Route path="/" component={Main} />
				<Route path="/category/:slug" component={Category} />
			</Routes>
		</Router>
	),
	root!
);
