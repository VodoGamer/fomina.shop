import type { CartItem } from "./cart";
import { getBulkProducts } from "./products";
import { getVariations } from "./variations";
import type { ReceiptItem } from "../interfaces/receipt";

export async function getReceiptProducts(
	cart: CartItem[],
): Promise<ReceiptItem[]> {
	const productInfos = await getBulkProducts(
		cart.map((item) => item.product_id),
	);
	const productVariationIds = cart.map((item) => item.variations);
	const receiptItems: ReceiptItem[] = [];
	for (const [index, item] of productInfos.entries()) {
		const variations = await getVariations(productVariationIds[index]);
		receiptItems.push({
			title: item.title,
			price: item.price + variations.reduce((a, b) => a + b.price_markup, 0),
			variations: variations.map((v) => {
				return `${v.key}: ${v.value}`;
			}),
		});
	}
	return receiptItems;
}
