import { Component, For, Show, createResource } from "solid-js";

import ProductInterface from "../../interfaces/product";
import Product from "./Product";

import styles from "./products.module.sass";
import { getFromApi } from "../../utils/api";
import { Loader } from "../Loader";

async function getProducts(categoryId: number): Promise<ProductInterface[]> {
  const response = await getFromApi(`products/category/${categoryId}`);
  return response.data;
}

const Products = (props: { categoryId?: number }) => {
  const [products] = createResource(props.categoryId, getProducts);

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
