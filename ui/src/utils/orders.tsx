import type OrderInterface from "../interfaces/order";
import type { PurchaseType } from "../schemas/purchase";
import { getFromApi, postApi } from "./api";

export async function getOrder(orderId: number): Promise<OrderInterface> {
	return (await getFromApi(`order/${orderId}`)).data;
}

export interface createOrderProps {
	purchaseData?: PurchaseType;
	productIds: number[];
}

export async function createOrder(props: createOrderProps): Promise<string> {
	const data = {
		product_ids: props.productIds,
		...props.purchaseData,
	};
	const response = await postApi("order", data);
	return response.data;
}
