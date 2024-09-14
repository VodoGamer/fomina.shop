import type CategoryInterface from "~/interfaces/category";

import { getFromApi } from "./api";

export async function getCategories(): Promise<CategoryInterface[]> {
	return (await getFromApi("categories/")).data;
}

export async function getCategory(slug: string): Promise<CategoryInterface> {
	return (await getFromApi("category/", { params: { id_or_slug: slug } })).data;
}
