import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import PurchaseForm from "~/components/PurchaseForm";
import PurchasePopup from "~/components/PurchasePopup";
import PurchaseReceipt from "~/components/PurchaseReceipt";
import type { PurchaseType } from "~/schemas/purchase";
import { getCart } from "~/utils/cart";

export interface purchaseSumStore {
	products: number[];
	delivery: number;
}

export default function Purchase() {
	const cart = getCart();
	const [purchase, setPurchase] = createSignal<PurchaseType>();
	const [sumStore, setSumStore] = createStore<purchaseSumStore>({
		products: [],
		delivery: 0,
	});

	return (
		<>
			<h1>Оформление заказа</h1>
			<PurchaseForm
				sumStore={sumStore}
				setSumStore={setSumStore}
				setPurchase={setPurchase}
			/>
			<PurchaseReceipt
				cart={cart}
				sumStore={sumStore}
				setSumStore={setSumStore}
			/>
			<Show when={purchase()}>
				<PurchasePopup purchaseData={purchase()} products={cart} />
			</Show>
		</>
	);
}
