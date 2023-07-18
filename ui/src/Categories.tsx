import { type Component, For, createResource } from "solid-js";

import { type category } from "./types/categoryType";


const fetchCategories = async (): Promise<[category]> =>
	(await fetch(`${import.meta.env.VITE_BASE_API_URL}/categories/`)).json();

const Categories: Component = () => {
	const [categories] = createResource(1, fetchCategories)

	return (
		<For each={categories()}>{(category) =>
			<a class="burger-menu__link" href={`/category/${category.slug}`}>{category.title}</a>
		}</For>
	)
}

export default Categories;
