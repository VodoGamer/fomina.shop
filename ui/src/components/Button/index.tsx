import { type JSX, splitProps } from "solid-js";

const Button = (
	props: JSX.HTMLAttributes<HTMLAnchorElement> & {
		text: string;
		link?: string;
	},
) => {
	const [local, others] = splitProps(props, ["text", "link"]);
	return (
		<>
			<a
				href={local.link}
				class="inline-block w-max cursor-pointer rounded-md border-2 border-gray-400 px-4 py-2 shadow-sm duration-200 ease-in hover:border-gray-700 hover:shadow-md"
				{...others}
			>
				{local.text}
			</a>
		</>
	);
};

export default Button;
