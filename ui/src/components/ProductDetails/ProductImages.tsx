import { For, Show, createSignal } from "solid-js";

import type ProductInterface from "../../interfaces/product";
import { getCompressedImageUrl, getImageUrl } from "../../utils/images";
import Carousel from "../Carousel";

import styles from "./productDetails.module.sass";

export default function ProductImages(props: { product?: ProductInterface }) {
  const [showCarousel, setShowCarousel] = createSignal<boolean | number>(false);

  return (
    <div class={styles.images}>
      <Show when={showCarousel() !== false}>
        <Carousel
          showCarousel={showCarousel}
          setShowCarousel={setShowCarousel}
          images={props.product?.images}
        />
      </Show>
      <For each={props.product?.images}>
        {(image, index) => (
          <img
            class={styles.image}
            src={getCompressedImageUrl(getImageUrl(image.url))}
            alt={image.description}
            onClick={() => setShowCarousel(index())}
            onKeyPress={() => setShowCarousel(index())}
          />
        )}
      </For>
    </div>
  );
}
