import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import { Suspense } from "solid-js";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
	return (
		<Router
			root={(props) => (
				<>
					<Header />
					<Suspense>{props.children}</Suspense>
					<Footer />
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
