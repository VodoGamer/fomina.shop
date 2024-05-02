import { For } from "solid-js";

import apiURL from "../../utils/api";
import ProductInterface from "../../interfaces/product";

import styles from "./productDetails.module.sass";

export default function ProductImages(props: { product?: ProductInterface }) {
  return (
    <div class={styles.images}>
      <For each={props.product?.images}>
        {(image) => (
          <img
            class={styles.image}
            src={`${apiURL}/files/${image.url}`}
            alt=""
          />
        )}
      </For>
    </div>
  );
}
