import { createResource, Match, Show, Switch } from "solid-js";
import { getCart } from "../../utils/cart";
import ReceiptField from "../ReceiptField";
import styles from "./purchaseReceipt.module.css";
import { getReceiptProducts } from "../../utils/receipt";
import { Loader } from "../Loader";
import ErrorBox from "../ErrorBox";

export default function PurchaseReceipt() {
	const cart = getCart();
	const [products] = createResource(cart, getReceiptProducts);

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
			<ReceiptField headerItem={{ title: "Стоимость доставки", price: 1000 }} />
		</div>
	);
}
