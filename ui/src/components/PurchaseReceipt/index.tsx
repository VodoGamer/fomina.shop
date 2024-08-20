import { Match, Show, Switch, createResource } from "solid-js";

import type { CartItem } from "../../utils/cart";
import { getReceiptProducts } from "../../utils/receipt";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import ReceiptField from "../ReceiptField";
import styles from "./purchaseReceipt.module.css";

export default function PurchaseReceipt(props: {
	cart: CartItem[];
	addToSum: (item: number) => void;
}) {
	const [products] = createResource(props.cart, getReceiptProducts);

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
						addToSum={props.addToSum}
					/>
				</Match>
			</Switch>
			<ReceiptField
				headerItem={{ title: "Стоимость доставки", price: 450 }}
				addToSum={props.addToSum}
			/>
		</div>
	);
}
