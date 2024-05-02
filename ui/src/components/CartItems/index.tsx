import { For, Match, Show, Switch, createResource } from "solid-js";

import { getCart, removeFromCart } from "../../utils/cart";
import ProductInterface from "../../interfaces/product";
import { getFromApi } from "../../utils/api";

import Button from "../Button";
import CartProduct from "./CartProduct";

import styles from "./assets/cartItems.module.sass";
import { Transition } from "solid-transition-group";
import { Loader } from "../Loader";

async function getProducts(productIds: number[]): Promise<ProductInterface[]> {
  if (productIds.length == 0) {
    return [];
  }
  return (await getFromApi("products", { params: { ids: productIds } })).data;
}

async function calculateSum(products: ProductInterface[]): Promise<number> {
  return products.reduce((sum, product) => sum + product.price, 0);
}

export default function CartItems() {
  const productIds = getCart();
  const [products, { mutate }] = createResource(productIds, getProducts);
  const [sum] = createResource(products, calculateSum);

  function deleteFromCart(id: number) {
    const index = productIds.indexOf(id);
    mutate((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });

    removeFromCart(id);
  }

  return (
    <>
      <Show
        when={products()?.length !== 0}
        fallback={
          <h1>
            Корзина пуста
            <Button text="Перейти к покупкам" link="/category/all-products" />
          </h1>
        }
      >
        <h1>Корзина</h1>
      </Show>
      <Show when={products.loading}>
        <Loader />
      </Show>
      <Transition mode="outin" name="slide-fade">
        <Switch>
          <Match when={products.error}>
            <p>Error...</p>
          </Match>
          <Match when={products()}>
            <div class={styles.products}>
              <For each={products()}>
                {(product) => (
                  <CartProduct
                    product={product}
                    deleteFromCart={deleteFromCart}
                  />
                )}
              </For>
            </div>
          </Match>
        </Switch>
      </Transition>
    </>
  );
}
