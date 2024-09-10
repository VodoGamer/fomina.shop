import { type JSX, splitProps } from "solid-js";

export default function Input(
	props: {
		labelText?: string;
		containerClass?: string;
	} & JSX.InputHTMLAttributes<HTMLInputElement>,
) {
	const [local, others] = splitProps(props, ["labelText", "containerClass"]);

	return (
		<label class="block font-light">
			{local.labelText}
			<input
				class="w-full rounded-md border-2 border-gray-300 p-2 focus:outline focus:outline-2 focus:outline-blue-300"
				type="text"
				{...others}
			/>
		</label>
	);
}
