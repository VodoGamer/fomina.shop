export default interface ProductVariation {
	id: number;
	key: string;
	value: string;
	product_id: number;
}

export interface SelectedVariation {
	key: string;
	value: string;
}
