import { createSignal, For } from "solid-js";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import CategoryInterface from "~/interfaces/category";

export default function BurgerMenu(props: { categories: CategoryInterface[] }) {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<Sheet open={isOpen()} onOpenChange={setIsOpen}>
			<SheetTrigger>
				<div class="flex items-center p-4">
					<div class="space-y-1">
						<div class="h-0.5 w-6 bg-black" />
						<div class="h-0.5 w-6 bg-black" />
						<div class="h-0.5 w-6 bg-black" />
					</div>
					<span class="sr-only">Открыть меню для навигации</span>
				</div>
			</SheetTrigger>
			<SheetContent>
				<nav class="flex flex-col gap-4 p-4">
					<For each={props.categories}>
						{(category) => (
							<a
								href={`/category/${category.slug}`}
								class="font-medium hover:underline"
								onClick={() => setIsOpen(false)}
							>
								{category.title}
							</a>
						)}
					</For>
					<a
						href={`/category/all-products`}
						class="font-medium hover:underline"
						onClick={() => setIsOpen(false)}
					>
						Все товары
					</a>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
