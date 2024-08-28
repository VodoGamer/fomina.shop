import type { Setter } from "solid-js";
import { safeParse } from "valibot";
import { PurchaseSchema, type PurchaseType } from "../schemas/purchase";

function getValueById(id: string) {
	const element = document.getElementById(id);
	if (!element) return "";
	return (element as HTMLInputElement).value;
}

function parseForm() {
	const purchase = safeParse(PurchaseSchema, {
		name: getValueById("name"),
		address: getValueById("address"),
		city: getValueById("city"),
		phone_number: getValueById("phone_number"),
		email: getValueById("email"),
	});
	return purchase;
}

export function createPurchase(
	setIssues: Setter<string[] | undefined>,
	setPurchase: Setter<PurchaseType | undefined>,
): void {
	const purchase = parseForm();
	if (!purchase.success) {
		setIssues(purchase.issues.map((issue) => issue.message));
	} else {
		setIssues([]);
		setPurchase(purchase.output);
	}
}
