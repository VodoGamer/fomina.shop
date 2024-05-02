import { Match, Show, Switch, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import Hero from "../components/Hero";
import Products from "../components/Products";
import { getFromApi } from "../utils/api";
import CategoryInterface from "../interfaces/category";
import hero_image from "../assets/hero.webp";
import { Loader } from "../components/Loader";

async function getCategory(slug: string): Promise<CategoryInterface> {
  return (await getFromApi(`category/`, { params: { id_or_slug: slug } })).data;
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
      <Switch>
        <Match when={category.error}>
          <p>Error... {category.error.message}</p>
        </Match>
        <Match when={category()}>
          <h1 style={{ margin: "24px 0" }}>{category()?.title}</h1>
          <Products categoryId={category()?.id} />
        </Match>
      </Switch>
    </>
  );
};

export default RouterCategory;
