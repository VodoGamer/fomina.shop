import styles from "./styles.module.sass";

import { type JSX } from "solid-js/types/jsx";

export default function ModernButton(props: {
	content: JSX.Element;
	link: string;
	class?: string;
}) {
	return (
		<>
			<div class={props.class}>
				<a class={styles.button} href={props.link}>
					<p class={styles.text}>{props.content}</p>
				</a>
			</div>
		</>
	);
}
