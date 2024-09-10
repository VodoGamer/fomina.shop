import { For } from "solid-js";
import { Slider, SliderProvider } from "solid-slider";

import styles from "./carousel.module.css";
import type Image from "../../interfaces/image";
import { getCompressedImageUrl } from "../../utils/images";

import "./slider.css";

export default function ImagesSlider(props: { images: Image[] }) {
	return (
		<SliderProvider>
			<Slider options={{ loop: true }}>
				<For each={props.images}>
					{(image) => (
						<img
							class={styles.image}
							src={getCompressedImageUrl(image.url)}
							alt={image.description}
						/>
					)}
				</For>
			</Slider>
		</SliderProvider>
	);
}
