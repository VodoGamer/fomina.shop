import { Menu } from "@ark-ui/solid";

import "./menu.css";
import styles from "./menu.module.css";
import menu_icon from "./menu.svg";

export default function Basic() {
	return (
		<Menu.Root onSelect={(id) => console.log(id)}>
			<Menu.Trigger>
				<img class={styles.trigger} src={menu_icon} alt="menu" width="43px" />
			</Menu.Trigger>
			<Menu.Positioner>
				<Menu.Content class={styles.content}>
					<Menu.Item
						value="kids"
						asChild={(props) => <a {...props} href="/products/kids" />}
					>
						Детям
					</Menu.Item>
					<Menu.Item
						value="all"
						asChild={(props) => <a {...props} href="/products/all" />}
					>
						Все товары
					</Menu.Item>
				</Menu.Content>
			</Menu.Positioner>
		</Menu.Root>
	);
}
