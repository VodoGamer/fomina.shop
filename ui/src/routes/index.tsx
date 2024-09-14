import { MetaProvider, Title } from "@solidjs/meta";
import type { Component } from "solid-js";

import hero_mobile from "~/assets/index_hero_mobile.webp";
import hero_retina from "~/assets/index_hero_retina.webp";

const Home: Component = () => {
	return (
		<>
			<MetaProvider>
				<Title>Свободная одежда для всей семьи - Fomina Kids</Title>
			</MetaProvider>
			<div class="justify-centerbg-gradient-to-r relative flex h-screen items-center from-primary/10 to-primary/30">
				<div class="absolute inset-0 z-0">
					<picture>
						<source srcset={`${hero_mobile} 1x, ${hero_retina} 2x`} />
						<img
							src={hero_mobile}
							alt=""
							class="h-full w-full object-cover opacity-50"
						/>
					</picture>
				</div>
				<div class="z-10 text-center">
					<h1 class="mb-4 text-4xl font-bold text-primary md:text-6xl">
						Детская одежда которая раскрывает индивидуальность
					</h1>
					<p class="mb-8 text-xl text-gray-800 md:text-2xl">
						Fomina Kids - Свобода стиля для всей семьи
					</p>
					<a
						href="/category/all-products"
						class="rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary/90"
					>
						Смотреть коллекцию
					</a>
				</div>
			</div>
		</>
	);
};

export default Home;
