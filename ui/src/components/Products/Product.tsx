import { Show } from "solid-js";
import ProductInterface from "../../interfaces/product";
import styles from "./products.module.sass";

export default function Product(props: ProductInterface) {
  return (
    <section>
      <a href={`/product/${props.id}`}>
        <div class={styles.image__block}>
          <img
            class={styles.image}
            src={
              props.images && props.images[0] ? `/${props.images[0].url}` : ""
            }
            alt=""
          />
        </div>
      </a>
      <h1 class={styles.product__title}>{props.title}</h1>
    </section>
  );
}
