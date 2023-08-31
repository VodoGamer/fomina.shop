import axios from "axios";
import { For, createResource } from "solid-js";

import { Image } from "../types/image";

async function getImages(productId: Number): Promise<Image[]> {
	const request = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/images/${productId}`, {
		params: {
			limit: 1,
		},
	});
	return request.data;
}

export default function ArticleImage(props: { productId: Number }) {
	const [images] = createResource(props.productId, getImages);

	return (
		<For each={images()} fallback={<div class="article__image loading-animation"></div>}>
			{(image: Image) => (
				<div class="article__image">
					<img src={`/${image.path}`} alt={image.description} />
				</div>
			)}
		</For>
	);
}
