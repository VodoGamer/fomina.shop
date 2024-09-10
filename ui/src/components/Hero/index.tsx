import hero_image from "~/assets/hero.webp";

export default function Hero(props: { image?: string }) {
	return (
		<>
			<div class="h-[60vh]">
				<img
					class="block h-full w-full object-cover"
					src={props.image || hero_image}
					alt="Заглавное изображение одежды, продаваемой в интернет-магазине"
				/>
			</div>
		</>
	);
}
