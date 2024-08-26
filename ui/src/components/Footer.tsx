import type { Component } from "solid-js";

const Footer: Component = () => {
	return (
		<footer class="flex flex-wrap gap-x-6 gap-y-2 mt-6">
			<FooterLink text="instagram" link="https://instagram.com/fominakids" />
			<FooterLink text="telegram" link="https://t.me/fominakids" />
			<FooterLink text="условия заказа" link="/order_terms" />
			<FooterLink text="условия возврата" link="/return_terms" />
		</footer>
	);
};

export default Footer;

function FooterLink(props: { text: string; link: string }) {
	return (
		<a
			class="text-gray-500 duration-300 ease-out hover:text-gray-900"
			href={props.link}
		>
			{props.text}
		</a>
	);
}
