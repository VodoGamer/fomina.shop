import styles from "./button.module.sass";

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
			<a href={local.link} class={styles.button} {...others}>
				{local.text}
			</a>
		</>
	);
};

export default Button;
