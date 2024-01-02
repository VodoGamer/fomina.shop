/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";

import Index from "./pages/index/Index";
import Category from "./pages/category/Category";
import ProductPage from "./pages/Product";
import Cart from "./pages/cart/Cart";
import Purchase from "./pages/purchase/Purchase";
import Payment from "./pages/Payment";

const root = document.getElementById("app");

render(
	() => (
		<Router>
			<Routes>
				<Route path="/" component={Index} />
				<Route path="/category/:slug" component={Category} />
				<Route path="/product/:productId/" component={ProductPage} />
				<Route path="/cart/" component={Cart} />
				<Route path="/purchase/" component={Purchase} />
				<Route path="/payment/:id/" component={Payment} />
			</Routes>
		</Router>
	),
	root!,
);
