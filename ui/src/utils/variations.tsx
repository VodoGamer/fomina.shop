import { getFromApi } from "./api";
import type VariationInterface from "../interfaces/variations";

function groupVariations(variations: VariationInterface[]) {
	const sortedVariations: Record<string, VariationInterface[]> = {};
	for (const variation of variations) {
		sortedVariations[variation.key] = [
			...(sortedVariations[variation.key] || []),
			variation,
		];
	}
	return sortedVariations;
}

export async function getSortedVariations(productId: number) {
	const response: VariationInterface[] = (
		await getFromApi(`product/${productId}/variations/`)
	).data;
	return groupVariations(response);
}

export async function getVariations(
	ids: number[],
): Promise<VariationInterface[]> {
	const response = await getFromApi("variations/", {
		params: { ids: ids },
	});
	return response.data;
}
