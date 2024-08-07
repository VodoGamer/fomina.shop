import { type JSX, splitProps } from "solid-js";

export default function Input(
	props: {
		labelText: string;
		inputName: string;
		containerClass?: string;
	} & JSX.InputHTMLAttributes<HTMLInputElement>,
) {
	const [local, others] = splitProps(props, [
		"labelText",
		"inputName",
		"containerClass",
	]);

	return (
		<p class={local.containerClass}>
			<label for={local.inputName}>{local.labelText}</label>
			<input type="text" name={local.inputName} {...others} />
		</p>
	);
}
