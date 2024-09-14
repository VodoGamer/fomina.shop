import type Image from "./image";
import type VariationInterface from "./variations";

export default interface ProductInterface {
	id: number;
	title: string;
	description: string;
	price: number;
	images?: Image[];
	variations?: VariationInterface[];
}
