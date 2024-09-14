import { MetaProvider, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { Match, Show, Switch, createResource } from "solid-js";
import { Transition } from "solid-transition-group";

import ErrorBox from "~/components/ErrorBox";
import Hero from "~/components/Hero";
import Products from "~/components/Products";
import { getCategory } from "~/utils/categories";
import { getCompressedImageUrl } from "~/utils/images";

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
	const [category] = createResource(() => props.slug, getCategory);

	return (
		<>
			<MetaProvider>
				<Title>Категория товаров - Fomina Style</Title>
			</MetaProvider>
			<Show when={category()}>
				{(category) => <Hero image={getCompressedImageUrl(category().image)} />}
			</Show>
			<Transition mode="outin" name="slide-fade">
				<Switch>
					<Match when={category.error}>
						<ErrorBox message={"Не удалось загрузить категорию"} />
					</Match>
					<Match when={category()}>
						{(category) => (
							<div>
								<h1 class="my-6 text-2xl font-bold">{category().title}</h1>
								<Products categoryId={category().id} />
							</div>
						)}
					</Match>
				</Switch>
			</Transition>
		</>
	);
};

export default RouterCategory;
