import { Accessor, createEffect, createSignal, For, Suspense } from "solid-js";

import trash from "~/assets/trash.svg";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import type ProductInterface from "~/interfaces/product";
import VariationInterface from "~/interfaces/variations";
import { getImageUrl } from "~/utils/images";

interface CartProductProps {
	product: ProductInterface;
	variations: VariationInterface[];
	deleteFromCart: (index: number) => void;
	index: Accessor<number>;
	addToSum: (item: number) => void;
}

function CartProduct(props: CartProductProps) {
	const [price, setPrice] = createSignal<number>(0);

	createEffect(() => {
		setPrice(
			props.product.price +
				props.variations.reduce(
					(acc, variation) => acc + variation.price_markup,
					0,
				),
		);
		props.addToSum(price());
	});

	return (
		<Suspense>
			<Card class="flex flex-col justify-between">
				<CardContent class="p-4">
					<div class="relative mb-2 aspect-square w-full">
						<img
							src={getImageUrl(
								props.product.images && props.product.images[0].url,
							)}
							alt={props.product.title}
							class="h-full w-full rounded-md object-cover"
						/>
						<For each={props.variations}>
							{(variation) => (
								<Badge class="absolute right-2 top-2 bg-blue-500">
									{variation.key}: {variation.value}
								</Badge>
							)}
						</For>
					</div>
					<h3 class="text-lg font-semibold">{props.product.title}</h3>
					<p class="line-clamp-3 text-sm text-gray-500">
						{props.product.description}
					</p>
					<p class="mt-2 text-lg font-bold">{price()}₽</p>
				</CardContent>
				<CardFooter class="gap-2 p-4">
					<a class="w-full" href={`/product/${props.product.id}`}>
						<Button class="w-full" variant="outline">
							Перейти к товару
						</Button>
					</a>
					<Button
						class="w-max"
						onClick={() => props.deleteFromCart(props.index())}
					>
						<img
							class="block h-full text-white"
							src={trash}
							alt="Иконка корзины"
							aria-label="Удалить из корзины"
						/>
					</Button>
				</CardFooter>
			</Card>
		</Suspense>
	);
}

export default CartProduct;
