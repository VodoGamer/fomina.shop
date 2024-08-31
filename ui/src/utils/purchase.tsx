import type { Setter } from "solid-js";
import { safeParse } from "valibot";
import { PurchaseSchema, type PurchaseType } from "../schemas/purchase";

function getValueById(id: string) {
	const element = document.getElementById(id);
	if (!element) return "";
	return (element as HTMLInputElement).value;
}

function parseForm(deliveryMethod?: string) {
	const purchase = safeParse(PurchaseSchema, {
		name: getValueById("name"),
		address: getValueById("address"),
		city: getValueById("city"),
		delivery_method: deliveryMethod,
		phone_number: getValueById("phone_number"),
		email: getValueById("email"),
	});
	return purchase;
}

export function createPurchase(
	setIssues: Setter<string[] | undefined>,
	setPurchase: Setter<PurchaseType | undefined>,
	deliveryMethod: string | undefined,
): void {
	const purchase = parseForm(deliveryMethod);
	if (!purchase.success) {
		setIssues(purchase.issues.map((issue) => issue.message));
	} else {
		setIssues([]);
		setPurchase(purchase.output);
	}
}
