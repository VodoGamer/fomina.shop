import type Image from "./image";
import ProductVariation from "./productVariation";

export default interface ProductInterface {
	id: number;
	title: string;
	description: string;
	price: number;
	images?: Image[];
	variations?: ProductVariation[];
}
