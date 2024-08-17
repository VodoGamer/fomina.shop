import { Match, Show, Switch, createEffect } from "solid-js";

import type OrderInterface from "../../interfaces/order";
import { PaymentStatus } from "../../interfaces/payment";
import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";

export default function OrderInfo(props: {
	order?: OrderInterface;
	refetch: () => void;
}) {
	if (!props.order) {
		return <></>;
	}
	createEffect(() => {
		if (props.order?.payment.status === PaymentStatus.pending) {
			setTimeout(() => {
				props.refetch();
			}, 3000);
		}
	});
	return (
		<Switch>
			<Match
				when={
					props.order.payment.status === PaymentStatus.pending ||
					props.order.payment.status === PaymentStatus.waiting_for_capture
				}
			>
				<div>
					<h2>Заказ №{props.order.id} ждёт оплаты</h2>
					<Loader />
				</div>
			</Match>
			<Match when={props.order.payment.status === PaymentStatus.succeeded}>
				<div>
					<h2>Заказ на {props.order.payment.price}₽ успешно оплачен</h2>
					<p>Номер вашего заказа: {props.order.id}</p>
					<p>Ваша почта: {props.order.email}</p>
				</div>
			</Match>
			<Match when={props.order.payment.status === PaymentStatus.canceled}>
				<ErrorBox message={"Заказ был отменен. Попробуйте заказать заново"} />
			</Match>
		</Switch>
	);
}
