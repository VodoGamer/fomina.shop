import { Component, Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import styles from "../assets/styles/product.module.sass";

import SliderHero from "../components/Hero/Slider";
import ProductInterface from "../interfaces/product";
import { getFromApi } from "../utils/api";
import { Loader } from "../components/Loader";

async function getProduct(id: number): Promise<ProductInterface> {
  return (await getFromApi(`product/${id}`)).data;
}

const Product: Component = () => {
  const params: { id: string } = useParams();
  const [product] = createResource(Number(params.id), getProduct);

  return (
    <>
      <MetaProvider>
        <Title>Product page - Fomina</Title>
      </MetaProvider>
      <Show when={!product.loading} fallback={<Loader />}>
        <Show when={product} fallback={<p>Error... {product.error}</p>}>
          <SliderHero
            images={product()?.images?.map((image) => {
              return `/${image.url}`;
            })}
            title={product()?.title}
          />
          <div class={styles.product}>
            <p class={styles.product__description}>{product()?.description}</p>
            <span class={styles.product__price}>{product()?.price}₽</span>
          </div>
        </Show>
      </Show>
    </>
  );
};

export default Product;
