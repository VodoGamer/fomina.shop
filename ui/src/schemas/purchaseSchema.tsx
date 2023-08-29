import { email, minLength, object, string, maxLength, startsWith, Output } from "valibot";

export const PurchaseSchema = object({
	name: string("имя не задано", [
		minLength(3, "длина имени должна быть от трёх символов"),
		maxLength(255, "длина имени не должна быть больше 255 символов"),
	]),
	address: string("адрес не задан", [
		minLength(3, "длина адреса должна быть от трёх символов"),
		maxLength(255, "длина адреса не должна быть больше 255 символов"),
	]),
	phoneNumber: string("номер телефона не задан", [
		minLength(3, "длина номера телефона должна быть от трёх символов"),
		maxLength(20, "длина номера телефона не должна быть больше 20 символов"),
		startsWith("+", 'номер телефона должен начинаться со знака "+"'),
	]),
	email: string("электронная почта не задана", [email("электронная почта должна быть валидной")]),
});

export type PurchaseData = Output<typeof PurchaseSchema>;
