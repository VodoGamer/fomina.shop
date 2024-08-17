import { Match, Show, Switch, createResource } from "solid-js";
import { Portal } from "solid-js/web";

import { createOrder, type createOrderProps } from "../../utils/orders";
import Button from "../Button";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import styles from "./PurchasePopup.module.css";

export default function PurchasePopup(props: createOrderProps) {
	if (!props.purchaseData) {
		return <ErrorBox message="Не удалось оформить заказ" />;
	}
	const [order] = createResource(props, createOrder);
	return (
		<Portal>
			<Show when={order.loading}>
				<Loader />
			</Show>
			<Switch>
				<Match when={order.error}>
					<ErrorBox message={"Не удалось оформить заказ"} />
				</Match>
				<Match when={order()}>
					<div class={styles.popup}>
						<div class={styles.content}>
							<p>Заказ успешно создан!</p>{" "}
							<Button text={"Перейти к оплате"} link={order()} />
						</div>
					</div>
				</Match>
			</Switch>
		</Portal>
	);
}
