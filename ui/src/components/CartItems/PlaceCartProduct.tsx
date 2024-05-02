import Button from "../Button";

import styles from "./assets/cartItems.module.sass";
import menu_cross from "./assets/menu_cross_white.svg";

export default function PlaceCartProduct(props: { productId: number }) {
  return (
    <section class={styles.product}>
      <div class={styles.image} style={{ "background-color": "#888" }}>
        <button class={styles.remove_button}>
          <img class={styles.remove_icon} src={menu_cross} alt="" />
        </button>
      </div>
      <div class={styles.info}>
        <h1>...</h1>
        <p>...₽</p>
        <Button text="Сведения о товаре" link={`/product/${props.productId}`} />
      </div>
    </section>
  );
}
