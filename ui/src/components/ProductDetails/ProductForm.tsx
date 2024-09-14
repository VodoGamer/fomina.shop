import {
	createEffect,
	createSignal,
	For,
	Match,
	onMount,
	Setter,
	Switch,
} from "solid-js";

import ProductInterface from "~/interfaces/product";
import VariationInterface from "~/interfaces/variations";
import { addToCart } from "~/utils/cart";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function ProductForm(props: {
	product: ProductInterface;
	sortedVariations: Record<string, VariationInterface[]>;
	setPriceMarkup: Setter<number>;
}) {
	const [selectedVariations, setSelectedVariations] = createSignal<
		Record<string, VariationInterface>
	>({});
	const [inCart, setInCart] = createSignal(false);

	function handleSelectVariation(variation: VariationInterface) {
		setSelectedVariations((prev) => ({
			...prev,
			[variation.key]: variation,
		}));
	}

	createEffect(() => {
		props.setPriceMarkup(
			Object.values(selectedVariations()).reduce(
				(acc, variation) => acc + variation.price_markup,
				0,
			),
		);
	});

	function handleAddToCart() {
		onMount(() => {
			setInCart(true);
			const variationIds = Object.values(selectedVariations()).map(
				(variation) => variation.id,
			);
			addToCart(props.product.id, variationIds);
		});
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleAddToCart();
			}}
			class="grid gap-4"
		>
			<For each={Object.entries(props.sortedVariations)}>
				{([key, variations]) => (
					<div class="grid gap-2">
						<Label class="text-base">{key}</Label>
						<RadioGroup
							defaultValue={variations[0].value}
							onChange={(e) =>
								handleSelectVariation(
									variations.find((v) => v.value === e) as VariationInterface,
								)
							}
							name="variations"
							class="flex flex-wrap items-center gap-2"
						>
							<For each={variations}>
								{(variation) => (
									<Label class="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted">
										<RadioGroupItem
											id={`${key}-${variation.value}`}
											value={variation.value}
										/>
										{variation.value}
									</Label>
								)}
							</For>
						</RadioGroup>
					</div>
				)}
			</For>
			<Switch>
				<Match when={!inCart()}>
					<Button size="lg" type="submit">
						Добавить в корзину
					</Button>
				</Match>
				<Match when={inCart()}>
					<a href="/cart">
						<Button
							class="w-full bg-green-300 text-black hover:bg-green-300"
							size="lg"
						>
							Товар был добавлен в корзину
						</Button>
					</a>
				</Match>
			</Switch>
		</form>
	);
}
