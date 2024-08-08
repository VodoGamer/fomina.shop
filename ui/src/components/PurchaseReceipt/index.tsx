import ReceiptField from "../ReceiptField";
import styles from "./purchaseReceipt.module.css";

export default function PurchaseReceipt() {
	return (
		<div class={styles.receipt}>
			<ReceiptField
				headerItem={{ title: "Товары в корзине", price: 2000 }}
				nestedItems={[
					{ title: "Платье", price: 1000 },
					{ title: "Рубашка", price: 1000 },
				]}
			/>
			<ReceiptField headerItem={{ title: "Стоимость доставки", price: 1000 }} />
		</div>
	);
}
