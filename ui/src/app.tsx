import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Header from "./components/header";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Header />
					<Title>SolidStart - Basic</Title>
					<Suspense>{props.children}</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
