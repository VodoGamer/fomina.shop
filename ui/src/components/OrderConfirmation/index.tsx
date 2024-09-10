import { Match, Show, Switch, createResource } from "solid-js";

import { getOrder } from "../../utils/orders";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";
import OrderInfo from "../OrderInfo";

export default function OrderConfirmation(props: { orderId: number }) {
	const [order, { refetch }] = createResource(props.orderId, getOrder);
	return (
		<>
			<Show when={order.loading}>
				<Loader />
			</Show>
			<Switch>
				<Match when={order.error}>
					<ErrorBox message={"Не удалось загрузить заказ"} />
				</Match>
				<Match when={order()}>
					<OrderInfo order={order()} refetch={refetch} />
				</Match>
			</Switch>
		</>
	);
}
