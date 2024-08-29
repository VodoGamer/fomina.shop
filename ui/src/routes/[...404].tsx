import { MetaProvider, Title } from "@solidjs/meta";

export default function NotFound() {
	return (
		<>
			<MetaProvider>
				<Title>Страница не найдена - Fomina Style</Title>
			</MetaProvider>
			<h1 class="text-center">Страница не найдена</h1>
		</>
	);
}
