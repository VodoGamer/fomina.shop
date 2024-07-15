import { Portal } from "solid-js/web";
import type Image from "../../interfaces/image";

import styles from "./carousel.module.sass";
import cross from "./menu_cross.svg";
import "./slider.css";
import ImagesSlider from "./slider";

export default function Carousel(props: {
	index: number;
	productId: number;
	images: Image[];
}) {
	function getImagesFromIndex() {
		const buffer = props.images;
		const result: Image[] = props.images.slice(props.index);
		return result.concat(buffer.slice(0, props.index));
	}

	return (
		<Portal>
			<div class={styles.container} data-portal="true">
				<ImagesSlider images={getImagesFromIndex()} />
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
