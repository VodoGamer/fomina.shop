import { getFromApi } from "./api";

import ProductVariation from "../interfaces/productVariation";

function groupVariations(variations: ProductVariation[]) {
	let variationsByKey: { [key: string]: ProductVariation[] } = {};
	for (const variation of variations) {
		if (!variationsByKey[variation.key]) {
			variationsByKey[variation.key] = [];
		}
		variationsByKey[variation.key].push(variation);
	}
	return variationsByKey;
}

export async function getProductVariations(productId: number) {
	const response: ProductVariation[] = (
		await getFromApi(`product/${productId}/variations/`)
	).data;
	return Object.entries(groupVariations(response));
}
