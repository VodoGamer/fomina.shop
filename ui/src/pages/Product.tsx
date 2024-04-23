import { Component, Show, createResource, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import styles from "../assets/styles/product.module.sass";

import SliderHero from "../components/Hero/Slider";
import ProductInterface from "../interfaces/product";
import { getFromApi } from "../utils/api";
import { Loader } from "../components/Loader";
import Button from "../components/Button";
import { addToCart } from "../utils/cart";

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
        <Title>Product page - Fomina</Title>
      </MetaProvider>
      <Show when={!product.loading} fallback={<Loader />}>
        <Show when={product} fallback={<p>Error... {product.error}</p>}>
          <SliderHero
            images={product()?.images?.map((image) => {
              return `/${image.url}`;
            })}
            title={product()?.title}
          />
          <div class={styles.product}>
            <p class={styles.product__description}>{product()?.description}</p>
            <span class={styles.product__price}>{product()?.price}₽</span>
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
        </Show>
      </Show>
    </>
  );
};

export default Product;
