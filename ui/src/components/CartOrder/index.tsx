import Button from "../Button";
import styles from "./assets/cartOrder.module.sass";

export default function CartOrder(props: { cartSum: number }) {
	return (
		<div class={styles.order}>
			<div>
				<h3>Общая сумма корзины: {props.cartSum}₽</h3>
				<Button text="Оформить заказ" link="/purchase" />
			</div>
		</div>
	);
}
