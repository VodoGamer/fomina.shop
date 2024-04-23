import { createSlider } from "solid-slider";
import "solid-slider/slider.css";
import autoSwitchPlugin from "../../utils/slider";

import styles from "./hero.module.sass";
import { For } from "solid-js";

export default function SliderHero(props: {
  images?: string[];
  title?: string;
}) {
  const [slider] = createSlider({ loop: true }, autoSwitchPlugin);

  return (
    <>
      <div class={styles.hero}>
        <div use:slider>
          <For each={props.images}>
            {(image) => (
              <img
                style={{ height: "80vh" }}
                class={styles.hero__image}
                src={image}
                alt=""
              />
            )}
          </For>
        </div>
        <h1 class={styles.hero__title}>{props.title}</h1>
      </div>
    </>
  );
}
