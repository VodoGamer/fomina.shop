import styles from "./hero.module.sass";

export default function Hero(props: { image?: string }) {
  return (
    <>
      <div class={styles.hero}>
        <img class={styles.image} src={props.image} alt="" />
      </div>
    </>
  );
}
