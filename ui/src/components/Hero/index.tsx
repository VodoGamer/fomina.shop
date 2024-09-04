import hero_image from "~/assets/hero.webp";

export default function Hero(props: { image?: string }) {
	return (
		<>
			<div class="h-[60vh]">
				<img
					class="object-cover block w-full h-full"
					src={props.image || hero_image}
					alt="Заглавное изображение одежды, продаваемой в интернет-магазине"
				/>
			</div>
		</>
	);
}
