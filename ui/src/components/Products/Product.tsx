import ProductInterface from "../../interfaces/product";
import styles from "./assets/products.module.sass";

export default function Product(props: ProductInterface) {
  return (
    <section>
      <a href={`/product/${props.id}`}>
        <img
          class={styles.product__image}
          src={props.images ? `/${props.images[0].url}` : ""}
          alt=""
        />
      </a>
      <h1 class={styles.product__title}>{props.title}</h1>
    </section>
  );
}
