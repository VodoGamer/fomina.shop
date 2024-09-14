import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import { JSX, Suspense } from "solid-js";

import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
	return (
		<Router
			root={(props: { children: JSX.ArrayElement }) => (
				<Suspense>
					<Header />
					<main class="mx-3 my-6 lg:mx-6">{props.children}</main>
					<Footer />
				</Suspense>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
