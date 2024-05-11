import type { Setter } from "solid-js";
import { Portal } from "solid-js/web";
import type Image from "../../interfaces/image";

import styles from "./carousel.module.sass";
import cross from "./menu_cross.svg";
import "./slider.css";
import ImagesSlider from "./slider";

export default function Carousel(props: {
	showCarousel: () => boolean | number;
	setShowCarousel: Setter<boolean | number>;
	images: Image[];
}) {
	return (
		<Portal>
			<div class={styles.container}>
				<ImagesSlider images={props.images} />
				<button
					type="button"
					class={styles.button}
					onClick={() => props.setShowCarousel(false)}
				>
					<img src={cross} alt="Иконка закрытия карусели" />
				</button>
			</div>
		</Portal>
	);
}
