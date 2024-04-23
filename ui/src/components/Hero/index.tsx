import { Show } from "solid-js";
import styles from "./hero.module.sass";

export default function Hero(props: { image?: string; title?: string }) {
  return (
    <div class={styles.hero}>
      <h1 class={styles.hero__title}>{props.title}</h1>
      <div class={styles.hero__image} style={{ "background-color": "#888888" }}>
        <Show when={props.image}>
          <img class={styles.hero__image} src={props.image} />
        </Show>
      </div>
    </div>
  );
}
