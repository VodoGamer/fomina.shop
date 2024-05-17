import { Resource, Show, createSignal } from "solid-js";

import Button from "../Button";
import styles from "./assets/cartOrder.module.sass";
import infoIcon from "./assets/info-circle.svg";

export default function CartOrder(props: { cartSum: Resource<number> }) {
	const [isDialogOpen, setDialogOpen] = createSignal(false);

	function togglePopup() {
		setDialogOpen(!isDialogOpen());
	}

	return (
		<div class={styles.order}>
			<Show when={!isDialogOpen()}>
				<div>
					<h3>Общая сумма: {props.cartSum()}</h3>
					<Button text="Оформить заказ" onClick={togglePopup} />
				</div>
			</Show>
			<Show when={isDialogOpen()}>
				<div class={styles.dialog}>
					<div class={styles.info}>
						<img class={styles.icon} src={infoIcon} alt="" />
						<span>Заказ через сайт в данный момент недоступен</span>
					</div>
					<div class={styles.buttons}>
						<Button text="Скрыть" onClick={togglePopup} />
						<Button
							text="Заказать через директ"
							link="https://instagram.com/fomina_style"
							style={{ "background-color": "#af34a0", color: "#fff" }}
						/>
					</div>
				</div>
			</Show>
		</div>
	);
}
