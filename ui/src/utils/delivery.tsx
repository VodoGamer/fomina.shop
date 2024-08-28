import type { SdekCalculateResponse } from "../interfaces/sdek";
import { getFromApi } from "./api";

export async function calculateSdekDelivery(
	is_courier: boolean,
	to_address: string,
	count: number,
): Promise<SdekCalculateResponse> {
	const response = await getFromApi(
		`sdek/calculate?is_courier=${is_courier}&to_address=${to_address}&count=${count}`,
	);
	return response.data;
}
