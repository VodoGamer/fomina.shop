import { For, Show, createResource, createSignal } from "solid-js";

import { getFromApi } from "../utils/api";
import { getCart, removeFromCart } from "../utils/cart";
import { Loader } from "../components/Loader";
import ProductInterface from "../interfaces/product";
import menu_cross from "../components/Header/assets/menu_cross.svg";
import styles from "../assets/styles/cart.module.sass";
import Button from "../components/Button";

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
    <>
      <Show
        when={products()?.length !== 0}
        fallback={
          <h1>
            Корзина пуста
            <Button text="Перейти к покупкам" link="/category/kids" />
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
                <section class={styles.product}>
                  <div
                    class={styles.image}
                    style={{
                      "background-image": `url(${
                        product.images?.length
                          ? `/${product.images[0].url}`
                          : ""
                      })`,
                    }}
                  >
                    <button
                      class={styles.remove_button}
                      onClick={() => deleteFromCart(product.id)}
                    >
                      <img class={styles.remove_icon} src={menu_cross} alt="" />
                    </button>
                  </div>
                  <div class={styles.info}>
                    <h1>{product.title}</h1>
                    <p>{product.price}₽</p>
                    <Button
                      text="Сведения о товаре"
                      link={`/product/${product.id}`}
                    />
                  </div>
                </section>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </>
  );
}
