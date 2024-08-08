import { For, type JSX, splitProps } from "solid-js";

import type { ReceiptItem } from "../../interfaces/receipt";
import styles from "./receiptField.module.css";

export default function ReceiptField(
	props: {
		headerItem: ReceiptItem;
		nestedItems?: ReceiptItem[];
	} & JSX.HTMLAttributes<HTMLDivElement>,
) {
	const [local, others] = splitProps(props, ["headerItem", "nestedItems"]);

	return (
		<div {...others}>
			<div class={styles.field}>
				<p>{local.headerItem.title}</p>
				<div class={styles.dots} />
				<p>{local.headerItem.price}₽</p>
			</div>
			<For each={local.nestedItems}>
				{(item) => (
					<div class={styles.nested}>
						<p>{item.title}</p>
						<div class={styles.dots} />
						<p>{item.price}₽</p>
					</div>
				)}
			</For>
		</div>
	);
}
