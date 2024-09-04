import { MetaProvider, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { Match, Show, Switch, createResource } from "solid-js";
import { Transition } from "solid-transition-group";

import ErrorBox from "~/components/ErrorBox";
import Hero from "~/components/Hero";
import { Loader } from "~/components/Loader";
import Products from "~/components/Products";
import { getCategory } from "~/utils/categories";
import { getImageUrl } from "~/utils/images";

import "~/assets/animations.css";

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
			<Hero image={getImageUrl(category()?.image)} />
			<Show when={category.loading}>
				<Loader />
			</Show>
			<Transition mode="outin" name="slide-fade">
				<Switch>
					<Match when={category.error}>
						<ErrorBox message={"Не удалось загрузить категорию"} />
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
