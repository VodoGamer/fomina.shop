import { type Component } from "solid-js";
import ModernButton from "../ModernButton/ModernButton";

import styles from "./styles.module.sass";
import instagram from "./instagram.svg";
import wildberries from "./wildberries.svg";
import ozon from "./ozon.svg";

const SocialButtons: Component = () => {
	return (
		<>
			<h2>Мы в соц. сетях</h2>
			<div class={styles.buttons}>
				<ModernButton
					content={<img src={instagram} />}
					link={"https://instagram.com/fominakids"}
					class={styles.instagram}
				/>
				<ModernButton
					content={<img src={wildberries} />}
					link={"https://www.wildberries.ru/brands/fominakids"}
					class={styles.wildberries}
				/>
				<ModernButton
					content={<img src={ozon} />}
					link={"https://ozon.ru/seller/fominakids-407284/odezhda-obuv-i-aksessuary-7500"}
					class={styles.ozon}
				/>
			</div>
		</>
	);
};

export default SocialButtons;
