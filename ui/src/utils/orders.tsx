import type OrderInterface from "../interfaces/order";
import { getFromApi } from "./api";

export async function getOrder(orderId: number): Promise<OrderInterface> {
	return (await getFromApi(`order/${orderId}`)).data;
}
