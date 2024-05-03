import { MetaProvider, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import type { Component } from "solid-js";

import ProductDetails from "../components/ProductDetails";

const Product: Component = () => {
	const params: { id: string } = useParams();

	return (
		<>
			<MetaProvider>
				<Title>Карточка товара - Fomina Style</Title>
			</MetaProvider>
			<ProductDetails productId={Number(params.id)} />
		</>
	);
};

export default Product;
