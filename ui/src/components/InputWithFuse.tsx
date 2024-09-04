import Fuse from "fuse.js";
import { For, type Setter, Show, createSignal, onMount } from "solid-js";
import Input from "./Input";

interface InputWithDropdownProps {
	setInputText: Setter<string | undefined>;
	labelText: string;
	options: string[];
	id?: string;
}

export function InputWithFuse(props: InputWithDropdownProps) {
	const [open, setOpen] = createSignal(false);
	const [filteredOptions, setFilteredOptions] = createSignal<string[]>(
		props.options,
	);
	let fuse: Fuse<string>;

	let inputRef!: HTMLInputElement;

	// Initialize Fuse.js on component mount
	onMount(() => {
		fuse = new Fuse(props.options, { threshold: 0.3 });
	});

	function handleInput(e: InputEvent) {
		const value = (e.target as HTMLInputElement).value;
		props.setInputText(value);

		if (value) {
			const results = fuse.search(value).map((result) => result.item);
			setFilteredOptions(results);
			setOpen(true);
		} else {
			setFilteredOptions(props.options);
			setOpen(false);
		}
	}

	function handleOptionClick(option: string) {
		inputRef.value = option;
		props.setInputText(option);
		setOpen(false);
	}

	return (
		<div class="relative">
			<Input
				type="text"
				placeholder={props.labelText}
				onInput={handleInput}
				onFocus={() => setOpen(true)}
				ref={inputRef}
				autocomplete="off"
				id={props.id}
			/>
			<Show when={open() && filteredOptions().length > 0}>
				<ul class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
					<For each={filteredOptions()}>
						{(option) => (
							<li
								class="p-2 cursor-pointer hover:bg-blue-100"
								onClick={() => handleOptionClick(option)}
								onKeyPress={() => handleOptionClick(option)}
							>
								{option}
							</li>
						)}
					</For>
				</ul>
			</Show>
		</div>
	);
}
