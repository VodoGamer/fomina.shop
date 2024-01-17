import { Swiper, SwiperSlide } from "swiper/solid";
import "swiper/css";
import axios from "axios";
import { createResource, For } from "solid-js";

import { type Image } from "../types/image";

import styles from "./Product/product.module.sass";

const getImages = async (productId: number): Promise<[Image]> => {
	const request = await axios.get<[Image]>(
		`${import.meta.env.VITE_BASE_API_URL}/images/${productId}`,
	);
	return request.data;
};

export default function ImagesSlider(props: { productId: number }) {
	const [images] = createResource(props.productId, getImages);

	return (
		<Swiper style={"width: 100%"} loop={true}>
			<For each={images()}>
				{(image: Image) => (
					<SwiperSlide class={styles.image}>
						<img class={styles.image} src={`/${image.path}`} alt="" />
					</SwiperSlide>
				)}
			</For>
		</Swiper>
	);
}
