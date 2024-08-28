export interface SdekCalculateRequest {
	is_courier: boolean;
	to_address: string;
	count: number;
}

export interface SdekCalculateResponse {
	period_min: number;
	period_max: number;
	total_sum: number;
	currency: string;
}
