import { MetaProvider, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { Match, Show, Switch, createResource } from "solid-js";
import { Transition } from "solid-transition-group";

import Hero from "../components/Hero";
import { Loader } from "../components/Loader";
import Products from "../components/Products";
import type CategoryInterface from "../interfaces/category";
import { getFromApi } from "../utils/api/base";

import hero_image from "../assets/hero.webp";
import "../assets/animations.sass";

async function getCategory(slug: string): Promise<CategoryInterface> {
	return (await getFromApi("category/", { params: { id_or_slug: slug } })).data;
}

const RouterCategory = () => {
	const params = useParams();
	return (
		<Show when={params.slug} keyed>
			<Category slug={params.slug} />
		</Show>
	);
};

const Category = (props: { slug: string }) => {
	const [category] = createResource(props.slug, getCategory);

	return (
		<>
			<MetaProvider>
				<Title>Категория товаров - Fomina Style</Title>
			</MetaProvider>
			<Hero image={hero_image} />
			<Show when={category.loading}>
				<Loader />
			</Show>
			<Transition mode="outin" name="slide-fade">
				<Switch>
					<Match when={category.error}>
						<p>Error... {category.error.message}</p>
					</Match>
					<Match when={category()}>
						<div>
							<h1 style={{ margin: "24px 0" }}>{category()?.title}</h1>
							<Products categoryId={category()?.id} />
						</div>
					</Match>
				</Switch>
			</Transition>
		</>
	);
};

export default RouterCategory;
