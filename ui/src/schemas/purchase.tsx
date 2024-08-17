import {
	type InferOutput,
	email,
	maxLength,
	nonEmpty,
	object,
	pipe,
	regex,
	string,
} from "valibot";

export const PurchaseSchema = object({
	name: pipe(
		string("Имя должно быть строкой"),
		nonEmpty("Имя не может быть пустым"),
		maxLength(255, "Имя не должно превышать 255 символов"),
	),
	phone_number: pipe(string(), regex(/^\+[\d]+$/, "Неверный формат телефона")),
	email: pipe(
		string("Электронная почта должна быть строкой"),
		nonEmpty("Электронная почта не может быть пустой"),
		email("Неверный формат электронной почты"),
		maxLength(64, "Электронная почта не должна превышать 64 символа"),
	),
	address: pipe(
		string("Адрес должен быть строкой"),
		nonEmpty("Адрес не может быть пустой"),
		maxLength(255, "Адрес не должен превышать 255 символов"),
	),
});

export type PurchaseType = InferOutput<typeof PurchaseSchema>;
