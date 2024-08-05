export default interface ProductVariation {
	id: number;
	key: string;
	value: string;
	price_markup: number;
}

export interface CartProductVariation {
	id: number;
	key: "SIZE" | "COLOR";
}
