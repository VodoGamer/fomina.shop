import { useIsRouting } from "@solidjs/router";
import { createResource, Show } from "solid-js";

import cart_icon from "~/assets/cart.svg";
import { getCategories } from "~/utils/categories";

import { HeaderLoader } from "../HeaderLoader";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
	const isRouting = useIsRouting();
	const [categories] = createResource(getCategories);

	return (
		<header class="mx-3 flex rounded-b-sm border-x border-b border-gray-300 lg:mx-6">
			<Show when={isRouting()}>
				<HeaderLoader />
			</Show>
			<a href="/" class="flex items-center border-r p-4">
				<span class="text-lg font-bold">Fomina</span>
			</a>

			<div class="ml-auto flex border-l">
				<a href="/cart" class="border-r p-4">
					<img src={cart_icon} alt="cart icon" class="w-6" />
				</a>

				<Show when={categories()}>
					{(categories) => <BurgerMenu categories={categories()} />}
				</Show>
			</div>
		</header>
	);
}
