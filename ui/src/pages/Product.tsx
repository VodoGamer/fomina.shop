import { useParams } from "@solidjs/router";
import axios from "axios";
import { Component, Show, createResource } from "solid-js";

import Header from "../components/Header";
import ProductImages from "../components/ProductImages";
import AddCartButton from "../components/AddCartButton";

type Params = { productId: string };

const getProduct = async (productId: number) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/product/${productId}/`)).data;

const displayDescription = (rawText: string) => {
	const paragraphs = rawText.split("\n");
	return paragraphs.map((paragraph) => <p class="product__description">{paragraph}</p>);
};

const Product: Component = () => {
	const params = useParams<Params>();
	const [product] = createResource(Number(params.productId), getProduct);

	return (
		<>
			<Header />
			<Show
				fallback={<h1>Произошла ошибка при получении информации о товаре :(</h1>}
				when={!product.error}
			>
				<Show fallback={<h1>Получаем информацию о товаре...</h1>} when={product()}>
					<div class="product">
						<ProductImages productId={product().id} class="product__image" limit={1} />
						<div class="product__details">
							<h1 class="product__title">{product().title}</h1>
							{displayDescription(product().description)}
							<p class="product__price">{product().price}₽</p>
							<AddCartButton productId={product().id} />
						</div>
					</div>
				</Show>
			</Show>
		</>
	);
};

export default Product;
