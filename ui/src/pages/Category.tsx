import { Component, Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import Hero from "../components/Hero";
import Products from "../components/Products";
import { getFromApi } from "../utils/api";
import CategoryInterface from "../interfaces/category";
import hero_image from "../assets/hero.png";
import { Loader } from "../components/Loader";

async function getCategory(slug: string): Promise<CategoryInterface> {
  return (await getFromApi(`category/`, { params: { id_or_slug: slug } })).data;
}

const Category: Component = () => {
  const params = useParams();
  const [category] = createResource(params.slug, getCategory);

  return (
    <>
      <MetaProvider>
        <Title>Category page - Fomina</Title>
      </MetaProvider>
      <Show when={!category.loading} fallback={<Loader />}>
        <Show when={category} fallback={<p>Error... {category.error}</p>}>
          <Hero image={hero_image} title={category().title} />
        </Show>
      </Show>
      <Products />
    </>
  );
};

export default Category;
