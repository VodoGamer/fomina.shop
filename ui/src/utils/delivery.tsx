import type {
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
