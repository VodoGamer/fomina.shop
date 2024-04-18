import { MetaProvider } from "@solidjs/meta";
import { Router, Route } from "@solidjs/router";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<MetaProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/category" component={Category} />
				</Router>
			</main>
			<Footer />
		</MetaProvider>
	);
}

export default App;
