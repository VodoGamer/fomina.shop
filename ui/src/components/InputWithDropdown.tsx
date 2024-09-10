import { For, type Setter, Show, Suspense, createSignal } from "solid-js";

import Input from "./Input";

interface InputWithDropdownProps {
	setInputText: Setter<string | undefined>;
	setChecked: Setter<boolean>;
	labelText: string;
	options?: string[];
}

export function InputWithDropdown(props: InputWithDropdownProps) {
	const [open, setOpen] = createSignal<boolean>(false);
	let ref!: HTMLInputElement;

	function handleOptionClick(option: string) {
		ref.value = option;
		props.setInputText(option);
		setOpen(false);
		props.setChecked(true);
	}

	return (
		<div class="relative">
			<Input
				labelText={props.labelText}
				id="city"
				onInput={(e) => {
					props.setInputText(e.target.value);
					props.setChecked(false);
				}}
				onFocusIn={() => setOpen(true)}
				autocomplete="off"
				ref={ref}
			/>
			<Suspense>
				<Show when={open() && props.options && props.options.length > 0}>
					<ul class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
						<For each={props.options}>
							{(option) => (
								<li
									class="cursor-pointer rounded-md p-2 hover:bg-blue-100"
									onClick={() => handleOptionClick(option)}
									onKeyPress={() => handleOptionClick(option)}
								>
									{option}
								</li>
							)}
						</For>
					</ul>
				</Show>
			</Suspense>
		</div>
	);
}

export default InputWithDropdown;
