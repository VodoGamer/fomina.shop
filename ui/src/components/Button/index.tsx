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
				class="px-4 py-2 inline-block border-2 w-max border-gray-400 rounded-md shadow-sm cursor-pointer duration-200 ease-in hover:border-gray-700 hover:shadow-md"
				{...others}
			>
				{local.text}
			</a>
		</>
	);
};

export default Button;
