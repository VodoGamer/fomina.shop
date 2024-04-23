/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";

import { MetaProvider } from "@solidjs/meta";
import { Router, Route } from "@solidjs/router";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));

const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));

import "./index.css";

const root = document.getElementById("app");

render(
  () => (
    <MetaProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/product/:id" component={Product} />
          <Route path="/cart" component={Cart} />
        </Router>
      </main>
      <Footer />
    </MetaProvider>
  ),
  root!
);
