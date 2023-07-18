import { useParams } from "@solidjs/router";
import { createResource, type Component, Show } from "solid-js";

import Header from "./Header";

const getCategory = async (categorySlug: string) =>
	(await fetch(`${import.meta.env.VITE_BASE_API_URL}/category/${categorySlug}`)).json();

const Category: Component = () => {
	const params = useParams();
	const [category] = createResource(params.slug, getCategory);

	return (
		<>
			<Header />
			<main>
				<Show when={category()}>
					<div class="first-look" style={`background-image: url('/${category().image_path}'); height: 60vh;`}>
						<h1 class="first-look__header">{category().title}</h1>
					</div>
				</Show>
			</main >
		</>
	);
}

export default Category;
