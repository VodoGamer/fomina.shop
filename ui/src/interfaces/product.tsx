import type Image from "./image";

export default interface ProductInterface {
	id: number;
	title: string;
	description: string;
	price: number;
	images?: Image[];
}
