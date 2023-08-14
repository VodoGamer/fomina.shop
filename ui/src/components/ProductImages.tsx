import axios from "axios";
import { For, createResource } from "solid-js";

import { Image } from "../types/image";


type Props = {
	productId: number,
	class: string,
	limit?: number | undefined,
}

const getImages = async (props: Props): Promise<[Image]> => {
	const request = await axios.get<[Image]>(`${import.meta.env.VITE_BASE_API_URL}/images/${props.productId}`,
		{
			params: {
				"limit": props.limit,
			}
		});
	return request.data;
}

export default function ProductImages(props: Props) {
	const [images] = createResource(props, getImages);

	return (
		<For each={images()}>{(image: Image) =>
			<img class={props.class} src={`/${image.path}`} alt={image.description} />
		}</For>
	)
}
