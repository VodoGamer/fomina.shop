import type { Setter } from "solid-js";
import { StringIssue, safeParse } from "valibot";
import { PurchaseSchema } from "../schemas/purchase";

function getValueById(id: string) {
	return (document.getElementById(id) as HTMLInputElement).value;
}

function parseForm() {
	const purchase = safeParse(PurchaseSchema, {
		name: getValueById("name"),
		address: getValueById("address"),
		phone_number: getValueById("phone_number"),
		email: getValueById("email"),
	});
	return purchase;
}

export function createPurchase(setIssues: Setter<string[]>): void {
	const purchase = parseForm();
	if (!purchase.success) {
		setIssues(purchase.issues.map((issue) => issue.message));
	} else {
		setIssues([]);
	}
}
