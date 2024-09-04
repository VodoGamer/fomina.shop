import type {
	DeliveryPoint,
	SdekCalculateRequest,
	SdekCalculateResponse,
} from "~/interfaces/sdek";

import { getFromApi } from "./api";

export async function calculateSdekDelivery(
	props: SdekCalculateRequest,
): Promise<SdekCalculateResponse> {
	return (
		await getFromApi("sdek/calculate", {
			params: props,
		})
	).data;
}

export async function getSdekPoints(
	cityName: string,
): Promise<DeliveryPoint[]> {
	const response = await getFromApi("sdek/handout_points", {
		params: { city_name: cityName },
	});
	return response.data;
}
