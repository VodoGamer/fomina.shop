import { type Component, type JSX, children, splitProps } from "solid-js";

const Footer: Component = () => {
	return (
		<footer class="flex flex-wrap gap-x-6 gap-y-2 mt-6">
			<FooterLink href="https://instagram.com/fominakids" target="_blank">
				instagram
			</FooterLink>
			<FooterLink href="https://t.me/fominakids" target="_blank">
				telegram
			</FooterLink>
			<FooterLink
				href="https://www.ozon.ru/brand/fominakids-100260931/"
				target="_blank"
			>
				ozon
			</FooterLink>
			<FooterLink href="/order_terms">условия заказа</FooterLink>
			<FooterLink href="/return_terms">условия возврата</FooterLink>
		</footer>
	);
};

export default Footer;

function FooterLink(
	props: {
		children: JSX.Element;
	} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
	const [local, others] = splitProps(props, ["children"]);
	const c = children(() => local.children);

	return (
		<a
			class="text-gray-500 duration-300 ease-out hover:text-gray-900"
			{...others}
		>
			{c()}
		</a>
	);
}
