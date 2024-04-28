import { For, Show, createResource, createSignal } from "solid-js";

import { getFromApi } from "../utils/api";
import { getCart, removeFromCart } from "../utils/cart";
import { Loader } from "../components/Loader";
import ProductInterface from "../interfaces/product";
import styles from "../assets/styles/cart.module.sass";

async function getProducts(productIds: number[]): Promise<ProductInterface[]> {
  if (productIds.length == 0) {
    return [];
  }
  return (await getFromApi("products", { params: { ids: productIds } })).data;
}

async function calculateSum(products: ProductInterface[]): Promise<number> {
  return products.reduce((sum, product) => sum + product.price, 0);
}

export default function Cart() {
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
    <div>
      <h1>Корзина</h1>
      <Show when={!products.loading} fallback={<Loader />}>
        <Show when={products} fallback={<p>Корзина пуста</p>}>
          <div class={styles.products}>
            <For each={products()}>
              {(product) => (
                <div class={styles.product}>
                  <button onClick={() => deleteFromCart(product.id)}>x</button>
                  <div>
                    {product.title} {product.price}
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
        {sum()}
      </Show>
    </div>
  );
}
