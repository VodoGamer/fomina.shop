import ProductInterface from "../interfaces/product";
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

export function getDescription(text: string, className: any) {
	const paragraphs = text.split("\n");
	const pTags = paragraphs.map((paragraph, _) => {
		return <p class={className}>{paragraph}</p>;
	});
	return pTags;
}
