import { Match, Show, Switch, createEffect, createResource } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

import type { CartItem } from "~/utils/cart";
import { getReceiptProducts } from "~/utils/receipt";

import ErrorBox from "~/components/ErrorBox";
import { Loader } from "~/components/Loader";
import ReceiptField from "~/components/ReceiptField";
import type { purchaseSumStore } from "~/components/purchase";

import styles from "./purchaseReceipt.module.css";

export default function PurchaseReceipt(props: {
	cart: CartItem[];
	sumStore: purchaseSumStore;
	setSumStore: SetStoreFunction<purchaseSumStore>;
}) {
	const [products] = createResource(props.cart, getReceiptProducts);
	createEffect(() => {
		const productsList = products();
		if (!productsList) return;
		for (const product of productsList) {
			props.setSumStore("products", (prev) => [...prev, product.price]);
		}
	});

	return (
		<div class={styles.receipt}>
			<Show when={products.loading}>
				<Loader />
			</Show>
			<Switch>
				<Match when={products.error}>
					<ErrorBox message={"Не удалось загрузить данные"} />
				</Match>
				<Match when={products()}>
					<ReceiptField
						headerItem={{ title: "Товары в корзине" }}
						nestedItems={products()}
					/>
				</Match>
			</Switch>
			<Show when={props.sumStore.delivery > 0}>
				<ReceiptField
					headerItem={{
						title: "Стоимость доставки",
						price: props.sumStore.delivery,
					}}
				/>
			</Show>
		</div>
	);
}
