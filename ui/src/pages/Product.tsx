import { useParams } from "@solidjs/router";
import axios from "axios";
import { Component, Show, createResource } from "solid-js";

import Header from "../Header";
import ProductImages from "../ProductImages";

type Params = { productId: string }

const getProduct = async (productId: number) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/product/${productId}/`)).data;

const displayDescription = (rawText: string) => {
	const paragraphs = rawText.split('\n');
	return paragraphs.map((paragraph) => <p class="product__description">{paragraph}</p>);
}

const Product: Component = () => {
	const params = useParams<Params>();
	const [product] = createResource(Number(params.productId), getProduct);

	return (
		<>
			<Header />
			<Show when={product()}>
				<div class="product">
					<ProductImages productId={product().id} class="product__image" limit={1} />
					<div class="product__details">
						<h1 class="product__title">{product().title}</h1>
						{displayDescription(product().description)}
						<p class="product__price">{product().price}₽</p>
					</div>
				</div>
			</Show>
		</>
	)
};

export default Product;
