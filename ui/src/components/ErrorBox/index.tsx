import styles from "./errorBox.module.css";
import icon from "./error.svg";

export default function Error(props: { message: string }) {
	return (
		<div class={styles.box}>
			<img
				class={styles.icon}
				src={icon}
				alt="Восклицательный знак в круге"
				width="32px"
			/>
			<p class={styles.message}>{props.message}</p>
		</div>
	);
}
