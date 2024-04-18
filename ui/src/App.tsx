import { MetaProvider } from "@solidjs/meta";
import { Router, Route } from "@solidjs/router";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<MetaProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
				</Router>
			</main>
			<Footer />
		</MetaProvider>
	);
}

export default App;
