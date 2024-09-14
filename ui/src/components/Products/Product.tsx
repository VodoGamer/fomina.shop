import type ProductInterface from "~/interfaces/product";
import { getImageUrl } from "~/utils/images";

import { Button } from "../ui/button";

export default function Product(props: ProductInterface) {
	return (
		<a href={`/product/${props.id}`}>
			<div class="group grid gap-2 rounded-sm border p-2 duration-150 hover:shadow">
				<img
					class="block aspect-[12/13] w-full rounded-sm bg-gray-300 object-cover"
					src={getImageUrl(props.images?.length ? props.images[0].url : "")}
					alt={props.title}
				/>
				<h2 class="text-xl font-semibold">{props.title}</h2>
				<p class="truncate font-light text-gray-600">{props.description}</p>
				<Button class="w-max group-hover:bg-primary/90">Подробнее</Button>
			</div>
		</a>
	);
}
