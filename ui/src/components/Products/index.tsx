import { Component, For, Show, createResource } from "solid-js";

import ProductInterface from "../../interfaces/product";
import Product from "./Product";

import styles from "./assets/products.module.sass";
import image from "./assets/image.png";
import { getFromApi } from "../../utils/api";
import { Loader } from "../Loader";

async function getProducts(): Promise<ProductInterface[]> {
  const response = await getFromApi("products");
  return response.data;
}

const Products: Component = () => {
  const [products] = createResource(getProducts);

  return (
    <Show when={!products.loading} fallback={<Loader />}>
      <Show
        when={!products.error}
        fallback={<p>Error... {products.error.message}</p>}
      >
        <div class={styles.products}>
          <For each={products()}>{(product) => <Product {...product} />}</For>
        </div>
      </Show>
    </Show>
  );
};

export default Products;
