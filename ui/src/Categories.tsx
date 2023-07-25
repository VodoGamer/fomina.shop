import { type Component, For, createResource } from "solid-js";
import axios from "axios";

import { type Category } from "./types/category";


const getCategories = async (): Promise<[Category]> =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/categories/`)).data;

const Categories: Component = () => {
	const [categories] = createResource(getCategories)

	return (
		<For each={categories()}>{(category: Category) =>
			<a class="burger-menu__link" href={!category.is_coming ? `/category/${category.slug}` : "/"}>{!category.is_coming ? category.title : `${category.title} (скоро)`}</a>
		}</For>
	)
}

export default Categories;
