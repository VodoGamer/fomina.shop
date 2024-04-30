import { Component, For, Show, createResource, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import styles from "../assets/styles/product.module.sass";

import ProductInterface from "../interfaces/product";
import { getFromApi } from "../utils/api";
import { Loader } from "../components/Loader";
import Button from "../components/Button";
import { addToCart } from "../utils/cart";
import apiURL from "../utils/api";

async function getProduct(id: number): Promise<ProductInterface> {
  return (await getFromApi(`product/${id}`)).data;
}

const Product: Component = () => {
  const params: { id: string } = useParams();
  const [product] = createResource(Number(params.id), getProduct);
  const [productInCart, setProductInCart] = createSignal(false);

  function processAddToCart() {
    addToCart(Number(params.id));
    setProductInCart(true);
  }

  return (
    <>
      <MetaProvider>
        <Title>Карточка товара - Fomina Style</Title>
      </MetaProvider>
      <Show when={!product.loading} fallback={<Loader />}>
        <Show when={product} fallback={<p>Error... {product.error}</p>}>
          <div class={styles.product}>
            <div class={styles.images}>
              <For each={product()?.images}>
                {(image) => (
                  <img
                    class={styles.image}
                    src={`${apiURL}/files/${image.url}`}
                    alt=""
                  />
                )}
              </For>
            </div>
            <div class={styles.info}>
              <h1>{product()?.title}</h1>
              <p class={styles.description}>{product()?.description}</p>
              <span class={styles.price}>{product()?.price}₽</span>
              <Show
                when={!productInCart()}
                fallback={
                  <Button
                    text="Перейти в корзину"
                    link="/cart"
                    style={{ "background-color": "#DDFFC2" }}
                  />
                }
              >
                <Button text="Добавить в корзину" onClick={processAddToCart} />
              </Show>
            </div>
          </div>
        </Show>
      </Show>
    </>
  );
};

export default Product;
