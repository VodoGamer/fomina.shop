import { For, type JSX, Show, splitProps } from "solid-js";

import styles from "./receiptField.module.css";
import type { ReceiptItem } from "../../interfaces/receipt";

export default function ReceiptField(
	props: {
		headerItem: { title: string; price?: number };
		nestedItems?: ReceiptItem[];
	} & JSX.HTMLAttributes<HTMLDivElement>,
) {
	const [local, others] = splitProps(props, ["headerItem", "nestedItems"]);
	function calculatePrice() {
		return (
			local.headerItem.price ||
			local.nestedItems?.reduce((a, b) => a + b.price, 0) ||
			0
		);
	}

	return (
		<div {...others}>
			<div class={styles.field}>
				<p>{local.headerItem.title}</p>
				<div class={styles.dots} />
				<p>{calculatePrice()}₽</p>
			</div>
			<For each={local.nestedItems}>
				{(item) => (
					<div class={styles.nested}>
						<p class={styles.nested__title}>
							{item.title}
							<Show when={item.variations?.length}> ({item.variations})</Show>
						</p>
						<div class={styles.dots} />
						<p>{item.price}₽</p>
					</div>
				)}
			</For>
		</div>
	);
}
