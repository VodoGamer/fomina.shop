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
					<ul class="absolute mt-1 w-max bg-white border border-gray-300 rounded-md shadow-lg z-10">
						<For each={props.options}>
							{(option) => (
								<li
									class="p-2 cursor-pointer rounded-md hover:bg-blue-100"
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
