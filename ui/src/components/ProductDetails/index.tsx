import { Show, createResource } from "solid-js";

import { getFromApi } from "../../utils/api";
import ProductInterface from "../../interfaces/product";

import { Loader } from "../Loader";
import ProductInfo from "./ProductInfo";
import ProductImages from "./ProductImages";

import styles from "./productDetails.module.sass";

async function getProduct(id: number): Promise<ProductInterface> {
  return (await getFromApi(`product/${id}`)).data;
}

export default function ProductDetails(props: { productId: number }) {
  const [product] = createResource(props.productId, getProduct);

  return (
    <div class={styles.product}>
      <Show when={!product.loading} fallback={<Loader />}>
        <Show when={product} fallback={<p>Error... {product.error}</p>}>
          <ProductImages product={product()} />
          <ProductInfo product={product()} productId={props.productId} />
        </Show>
      </Show>
    </div>
  );
}
