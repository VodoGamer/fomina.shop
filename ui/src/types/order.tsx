export type OrderAmount = {
	value: string;
	currency: string;
};

export type OrderConfirmation = {
	type: string;
	confirmation_url: string;
};

export type Order = {
	id: string;
	status: string;
	amount: OrderAmount;
	description: string;
	confirmation: OrderConfirmation | null;
};
