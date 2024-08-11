import { For, type JSX, Show, splitProps } from "solid-js";

import type { ReceiptItem } from "../../interfaces/receipt";
import styles from "./receiptField.module.css";

export default function ReceiptField(
	props: {
		headerItem: { title: string; price?: number };
		nestedItems?: ReceiptItem[];
	} & JSX.HTMLAttributes<HTMLDivElement>,
) {
	const [local, others] = splitProps(props, ["headerItem", "nestedItems"]);

	return (
		<div {...others}>
			<div class={styles.field}>
				<p>{local.headerItem.title}</p>
				<div class={styles.dots} />
				<p>
					{local.headerItem.price ||
						local.nestedItems?.reduce((a, b) => a + b.price, 0)}
					₽
				</p>
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
