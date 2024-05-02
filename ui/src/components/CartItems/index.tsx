import { For, Show, createResource, createSignal } from "solid-js";

import { getCart, removeFromCart } from "../../utils/cart";
import ProductInterface from "../../interfaces/product";
import { getFromApi } from "../../utils/api";

import Button from "../Button";
import { Loader } from "../Loader";
import CartProduct from "./CartProduct";

import styles from "./assets/cartItems.module.sass";

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
  const [productsIds, setProductIds] = createSignal(getCart());
  const [products] = createResource(productsIds, getProducts);
  const [sum] = createResource(products, calculateSum);

  function deleteFromCart(id: number) {
    const index = productsIds().indexOf(id);
    setProductIds((prevItems) => {
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
      <Show when={!products.loading} fallback={<Loader />}>
        <Show when={products()}>
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
        </Show>
      </Show>
    </>
  );
}
