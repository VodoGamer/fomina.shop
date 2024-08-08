import { MetaProvider, Title } from "@solidjs/meta";
import PurchaseForm from "../components/PurchaseForm";
import PurchaseReceipt from "../components/PurchaseReceipt";

export default function Purchase() {
	return (
		<>
			<MetaProvider>
				<Title>Оформление заказа - Fomina Style</Title>
			</MetaProvider>
			<h1>Оформление заказа</h1>
			<PurchaseForm />
			<PurchaseReceipt />
		</>
	);
}
