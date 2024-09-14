import { For, createSignal } from "solid-js";

import type ProductInterface from "~/interfaces/product";
import VariationInterface from "~/interfaces/variations";
import { getImageUrl } from "~/utils/images";
import { getDescription } from "~/utils/products";
import "~/assets/animations.css";

import { ProductForm } from "./ProductForm";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

export default function ProductInfo(props: {
	product: ProductInterface;
	variations: Record<string, VariationInterface[]>;
}) {
	const [priceMarkup, setPriceMarkup] = createSignal(0);

	return (
		<div class="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
			<Carousel class="mx-4" opts={{ loop: true }}>
				<CarouselContent>
					<For each={props.product.images}>
						{(image) => (
							<CarouselItem>
								<img
									class="block aspect-[3/4] w-full rounded-sm bg-gray-300 object-cover"
									src={getImageUrl(image.url)}
									alt={props.product.title}
								/>
							</CarouselItem>
						)}
					</For>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div class="grid gap-4 md:gap-8">
				<div class="grid gap-2">
					<h1 class="text-3xl font-bold">{props.product.title}</h1>
					<p class="truncate text-muted-foreground">
						{props.product.description}
					</p>
				</div>
				<div class="grid gap-2">
					<h2 class="text-4xl font-bold">
						{props.product.price + priceMarkup()}₽
					</h2>
				</div>
				<ProductForm
					product={props.product}
					sortedVariations={props.variations}
					setPriceMarkup={setPriceMarkup}
				/>
				<div class="line-clamp-1 grid gap-4 text-sm">
					{getDescription(props.product.description, "")}
				</div>
			</div>
		</div>
	);
}
