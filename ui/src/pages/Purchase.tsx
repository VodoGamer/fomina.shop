import { MetaProvider, Title } from "@solidjs/meta";
import { Show, Suspense, createSignal } from "solid-js";

import { Loader } from "../components/Loader";
import PurchaseForm from "../components/PurchaseForm";
import PurchasePopup from "../components/PurchasePopup";
import PurchaseReceipt from "../components/PurchaseReceipt";
import type { PurchaseType } from "../schemas/purchase";
import { getCart } from "../utils/cart";

export default function Purchase() {
	const cart = getCart();
	const [sum, setSum] = createSignal<number>(0);
	const [purchase, setPurchase] = createSignal<PurchaseType>();

	function addToSum(price: number) {
		setSum((prev) => prev + price);
	}

	return (
		<>
			<MetaProvider>
				<Title>Оформление заказа - Fomina Style</Title>
			</MetaProvider>
			<h1>Оформление заказа</h1>
			<Suspense fallback={<Loader />}>
				<PurchaseForm sum={sum} setPurchase={setPurchase} />
				<PurchaseReceipt cart={cart} addToSum={addToSum} />
			</Suspense>
			<Show when={purchase()}>
				<PurchasePopup purchaseData={purchase()} products={cart} />
			</Show>
		</>
	);
}
