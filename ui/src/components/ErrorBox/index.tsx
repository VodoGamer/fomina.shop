import icon from "./error.svg";
import styles from "./errorBox.module.css";

export default function ErrorBox(props: { message: string }) {
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
