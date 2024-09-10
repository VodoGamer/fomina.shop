import type Image from "~/interfaces/image";
import type ProductInterface from "~/interfaces/product";
import { getCompressedImageUrl } from "~/utils/images";

export default function Product(props: ProductInterface) {
	return (
		<section>
			<a
				class="block rounded border-2 border-gray-100 p-2 duration-200 ease-out hover:border-gray-300 lg:p-3 xl:p-4"
				href={`/product/${props.id}`}
			>
				<ProductImage image={props.images ? props.images[0] : undefined} />
				<h2 class="mt-2 text-xl font-normal lg:mt-4 xl:mt-4">{props.title}</h2>
			</a>
		</section>
	);
}

function ProductImage(props: { image?: Image }) {
	if (!props.image) {
		return <ProductImagePlaceholder />;
	}
	return (
		<img
			class="block aspect-[12/13] w-full rounded-sm bg-gray-300 object-cover"
			src={getCompressedImageUrl(props.image.url)}
			alt={props.image.description}
		/>
	);
}

function ProductImagePlaceholder() {
	return (
		<div
			class="block aspect-[12/13] w-full rounded-sm bg-gray-300 object-cover"
			aria-label="Плэйсхолдер для товара без изображения"
		/>
	);
}
