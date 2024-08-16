import { MetaProvider, Title } from "@solidjs/meta";
import { Suspense, createSignal } from "solid-js";

import { Loader } from "../components/Loader";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseReceipt from "../components/PurchaseReceipt";
import { getCart } from "../utils/cart";

export default function Purchase() {
	const cart = getCart();
	const [sum, setSum] = createSignal<number>(0);

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
				<PurchaseForm sum={sum} />
				<PurchaseReceipt cart={cart} addToSum={addToSum} />
			</Suspense>
		</>
	);
}
