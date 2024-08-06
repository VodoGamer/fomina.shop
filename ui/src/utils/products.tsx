import type ProductInterface from "../interfaces/product";
import { getFromApi } from "./api";

export async function getProducts(
	categoryId: number,
): Promise<ProductInterface[]> {
	const response = await getFromApi(`products/category/${categoryId}/`);
	return response.data;
}

export async function getProduct(id: number): Promise<ProductInterface> {
	const response = await getFromApi(`product/${id}/`);
	return response.data;
}

export function getDescription(text: string, className: string) {
	const paragraphs = text.split("\n");
	const pTags = paragraphs.map((paragraph, index) => {
		return (
			<p class={className} key={paragraph}>
				{paragraph}
			</p>
		);
	});
	return pTags;
}

export async function getBulkProducts(
	productIds: number[],
): Promise<ProductInterface[]> {
	if (productIds.length === 0) {
		return [];
	}
	const response = await getFromApi("products", {
		params: { ids: productIds },
	});
	for (const [key, product] of Object.entries(response.data)) {
		if (product == null) {
			removeFromCart(Number(key));
			response.data.splice(Number(key), 1);
		}
	}

	return response.data;
}
