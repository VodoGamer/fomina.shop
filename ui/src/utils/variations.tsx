import { getFromApi } from "./api";
import type ProductVariation from "../interfaces/productVariation";

function groupVariations(variations: ProductVariation[]) {
	const variationsByKey: { [key: string]: ProductVariation[] } = {};
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

export async function getVariations(
	ids: number[],
): Promise<ProductVariation[]> {
	const response = await getFromApi("variations/", {
		params: { ids: ids },
	});
	return response.data;
}
