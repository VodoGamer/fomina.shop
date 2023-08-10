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

const addToCart = (newId: number) => {
	const currentCart = localStorage.getItem("cartProducts")?.split(",");
	if (currentCart) {
		currentCart?.push(String(newId));
		localStorage.setItem("cartProducts", String(currentCart));
	} else {
		return localStorage.setItem("cartProducts", String(newId));
	};
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
						<button onClick={() => addToCart(product().id)}>Добавить в корзину</button>
					</div>
				</div>
			</Show>
		</>
	)
};

export default Product;
