import VariationInterface from "~/interfaces/variations";

import { getFromApi } from "./api";
import { CartItem, removeFromCart } from "./cart";
import { getVariations } from "./variations";
import type ProductInterface from "../interfaces/product";

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
	let paragraphs = text.split("\n");
	paragraphs = paragraphs.filter((paragraph) => paragraph !== "\r");
	const pTags = paragraphs.map((paragraph) => {
		return <p class={className}>{paragraph}</p>;
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

export async function getCartProducts(
	cart: CartItem[],
): Promise<{ product: ProductInterface; variations: VariationInterface[] }[]> {
	const result: {
		product: ProductInterface;
		variations: VariationInterface[];
	}[] = [];
	for (const item of cart) {
		const product = await getProduct(item.product_id);
		const variations = await getVariations(item.variations);
		result.push({ product, variations });
	}
	return result;
}
