import { useParams } from "@solidjs/router";
import { createResource, type Component, Show } from "solid-js";
import axios from "axios";

import Header from "../components/Header";
import Products from "../components/ProductsList";

const getCategory = async (categorySlug: string) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/category/${categorySlug}`)).data;

const Category: Component = () => {
	const params = useParams();
	const [category] = createResource(params.slug, getCategory);

	return (
		<>
			<Header />
			<main class="main">
				<Show
					fallback={<h1>Произошла ошибка при получении информации о категории :(</h1>}
					when={!category.error}
				>
					<Show fallback={<h1>Получаем информацию о категории...</h1>} when={category()}>
						<div
							class="first-look"
							style={`background-image: url('/${category().image_path}'); height: 60vh;`}
						>
							<h1 class="first-look__header">{category().title}</h1>
						</div>
					</Show>
				</Show>
				<Products categorySlug={params.slug} />
			</main>
		</>
	);
};

export default Category;
