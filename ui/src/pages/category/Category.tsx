import { useParams } from "@solidjs/router";
import { createResource, type Component, Show } from "solid-js";
import axios from "axios";

import Header from "../../components/Header/Header";
import ArticlesList from "../../components/Articles/ArticlesList";
import Hero from "../../components/Hero/Hero";

import styles from "./index.module.sass";

const getCategory = async (categorySlug: string) =>
	(await axios.get(`${import.meta.env.VITE_BASE_API_URL}/category/${categorySlug}`)).data;

const Category: Component = () => {
	const params = useParams();
	const [category] = createResource(params.slug, getCategory);

	return (
		<>
			<Header />
			<main class={styles.main}>
				<Show
					fallback={<h1>Произошла ошибка при получении информации о категории :(</h1>}
					when={!category.error}
				>
					<Show fallback={<h1>Получаем информацию о категории...</h1>} when={category()}>
						<Hero header={category().title} background_image_url={category().image_path} />
					</Show>
				</Show>
				<ArticlesList categorySlug={params.slug} />
			</main>
		</>
	);
};

export default Category;
