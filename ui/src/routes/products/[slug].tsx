import { useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import Products from "~/components/products";

export default function ProductsPage() {
	const params = useParams();
	return (
		<main>
			<Title>Products {params.slug}</Title>
			<h1>Products {params.slug}</h1>
			<Products />
		</main>
	);
}
