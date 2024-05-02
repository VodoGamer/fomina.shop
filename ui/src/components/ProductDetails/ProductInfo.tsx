import { Match, Switch, createSignal } from "solid-js";
import Button from "../Button";
import ProductInterface from "../../interfaces/product";
import { addToCart } from "../../utils/cart";
import styles from "./productDetails.module.sass";
import { Transition } from "solid-transition-group";

import "../../assets/animations.sass";

export default function ProductInfo(props: {
  product?: ProductInterface;
  productId: number;
}) {
  const [productInCart, setProductInCart] = createSignal(false);

  function processAddToCart() {
    addToCart(props.productId);
    setProductInCart(true);
  }

  return (
    <div class={styles.info}>
      <h1>{props.product?.title}</h1>
      <p class={styles.description}>{props.product?.description}</p>
      <span class={styles.price}>{props.product?.price}₽</span>
      <Transition mode="outin" name="slide-fade">
        <Switch>
          <Match when={!productInCart()}>
            <Button text="Добавить в корзину" onClick={processAddToCart} />
          </Match>
          <Match when={productInCart()}>
            <Button
              text="Перейти в корзину"
              link="/cart"
              style={{ "background-color": "#DDFFC2" }}
            />
          </Match>
        </Switch>
      </Transition>
    </div>
  );
}
