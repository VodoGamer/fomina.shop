import { createSlider } from "solid-slider";
import "solid-slider/slider.css";
import autoSwitchPlugin from "../../utils/slider";

import styles from "./hero.module.sass";

export default function Hero(props: { image?: string; title?: string }) {
  const [slider] = createSlider({}, autoSwitchPlugin);

  return (
    <>
      <div class={styles.hero}>
        <img class={styles.hero__image} src={props.image} alt="" />
        <h1 class={styles.hero__title}>{props.title}</h1>
      </div>
    </>
  );
}
