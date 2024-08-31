import type { PaymentInterface } from "./payment";

export default interface OrderInterface {
	id: number;
	name: string;
	email: string;
	city: string;
	delivery_method: string;
	address: string;
	phone_number: string;
	payment: PaymentInterface;
}
