import type Image from "~/interfaces/image";
import type ProductInterface from "~/interfaces/product";
import { getCompressedImageUrl } from "~/utils/images";

export default function Product(props: ProductInterface) {
	return (
		<section>
			<a
				class="block border-2 border-gray-100 rounded p-2 lg:p-3 xl:p-4 duration-200 ease-out hover:border-gray-300"
				href={`/product/${props.id}`}
			>
				<ProductImage image={props.images ? props.images[0] : undefined} />
				<h2 class="font-normal text-xl mt-2 lg:mt-4 xl:mt-4">{props.title}</h2>
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
			class="w-full block aspect-[12/13] object-cover rounded-sm bg-gray-300"
			src={getCompressedImageUrl(props.image.url)}
			alt={props.image.description}
		/>
	);
}

function ProductImagePlaceholder() {
	return (
		<div
			class="w-full block aspect-[12/13] object-cover rounded-sm bg-gray-300"
			aria-label="Плэйсхолдер для товара без изображения"
		/>
	);
}
