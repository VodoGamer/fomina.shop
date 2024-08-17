export enum PaymentStatus {
	pending = "pending",
	waiting_for_capture = "waiting_for_capture",
	succeeded = "succeeded",
	canceled = "canceled",
}

export interface PaymentInterface {
	status: PaymentStatus;
	price: number;
	order_id: number;
	id: string;
}
