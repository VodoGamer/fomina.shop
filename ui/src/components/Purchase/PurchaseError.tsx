import error from "./error.svg";

import styles from "./styles.module.sass";

export default function PurchaseError(props: { errorText: string }) {
	return (
		<div class={styles.purchase__error}>
			<img src={error} alt="" />
			<p>{props.errorText}</p>
		</div>
	);
}
