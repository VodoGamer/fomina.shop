import type OrderInterface from "../interfaces/order";
import type { PurchaseType } from "../schemas/purchase";
import { getFromApi, postApi } from "./api";
import type { CartItem } from "./cart";

export async function getOrder(orderId: number): Promise<OrderInterface> {
	return (await getFromApi(`order/${orderId}`)).data;
}

export interface createOrderProps {
	purchaseData?: PurchaseType;
	products: CartItem[];
}

export async function createOrder(props: createOrderProps): Promise<string> {
	const data = {
		products: props.products,
		...props.purchaseData,
	};
	const response = await postApi("order", data);
	return response.data;
}
