import { Show } from "solid-js";

import { Button } from "../ui/button";
import styles from "./assets/cartOrder.module.css";

export default function CartOrder(props: { cartSum: number }) {
	return (
		<div class={styles.order}>
			<div>
				<h3>Общая сумма корзины: {props.cartSum}₽</h3>
				<Show when={props.cartSum > 0}>
					<a href="/purchase">
						<Button>Оформить заказ</Button>
					</a>
				</Show>
			</div>
		</div>
	);
}
