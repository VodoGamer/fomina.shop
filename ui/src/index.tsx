/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import { MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));

const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const Product = lazy(() => import("./pages/Product"));
const Image = lazy(() => import("./pages/Image"));
const Cart = lazy(() => import("./pages/Cart"));
const Purchase = lazy(() => import("./pages/Purchase"));
const Order = lazy(() => import("./pages/Order"));
const OrderTerms = lazy(() => import("./pages/OrderTerms"));
const ReturnTerms = lazy(() => import("./pages/ReturnTerms"));

import "./index.css";

const root = document.getElementById("app");
if (!root) {
	throw new Error("Root element not found");
}

render(
	() => (
		<MetaProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/category/:slug" component={Category} />
					<Route path="/product/:id" component={Product} />
					<Route path="/product/:id/image/:index" component={Image} />
					<Route path="/cart" component={Cart} />
					<Route path="/purchase" component={Purchase} />
					<Route path="/order/:id" component={Order} />
					<Route path="/order_terms" component={OrderTerms} />
					<Route path="/return_terms" component={ReturnTerms} />
				</Router>
			</main>
			<Footer />
		</MetaProvider>
	),
	root,
);
