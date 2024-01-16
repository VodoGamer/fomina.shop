import { useParams } from "@solidjs/router";
import axios from "axios";
import { Component, Show, createResource } from "solid-js";

import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import { Product as ProductModel } from "../types/product";

type Params = { productId: string };

const getProduct = async (productId: number) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/product/${productId}/`)).data;

const ProductPage: Component = () => {
	const params = useParams<Params>();
	const [product] = createResource(Number(params.productId), getProduct);

	return (
		<>
			<Header />
			<Show
				when={!product.error}
				fallback={
					<h1>
						Произошла ошибка при получении информации о товаре :(
						<br />
						{product.error.message}
					</h1>
				}
			>
				<Show when={product()} fallback={<h1>Получаем информацию о товаре...</h1>}>
					<Product product={product()} />
				</Show>
			</Show>
		</>
	);
};

export default ProductPage;
