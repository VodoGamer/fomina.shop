import { Portal } from "solid-js/web";

import type Image from "../../interfaces/image";
import { getImagesFromIndex } from "../../utils/images";
import ImagesSlider from "./slider";

import styles from "./carousel.module.css";
import cross from "./menu_cross.svg";
import "./slider.css";

export default function Carousel(props: {
	index: number;
	productId: number;
	images?: Image[];
}) {
	if (!props.images) {
		return <></>;
	}

	return (
		<Portal>
			<div class={styles.container} data-portal="true">
				<ImagesSlider images={getImagesFromIndex(props.index, props.images)} />
				<a
					class={styles.button}
					onClick={() => window.history.go(-1)}
					href={`/product/${props.productId}`}
				>
					<img
						class={styles.cross}
						src={cross}
						alt="Иконка закрытия карусели"
					/>
				</a>
			</div>
		</Portal>
	);
}
