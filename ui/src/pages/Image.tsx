import { MetaProvider, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { type Component, Match, Show, Switch, createResource } from "solid-js";
import Carousel from "../components/Carousel";
import { Loader } from "../components/Loader";
import { getProduct } from "../utils/products";

const Image: Component = () => {
	const params: { id: string; index: string } = useParams();
	const [product] = createResource(Number(params.id), getProduct);
	return (
		<>
			<MetaProvider>
				<Title>Карточка изображения - Fomina Style</Title>
			</MetaProvider>
			<Show when={product.loading}>
				<Loader />
			</Show>
			<Switch>
				<Match when={product.error}>
					<p>Error... {product.error.message}</p>
				</Match>
				<Match when={product()}>
					<h1>{product()?.title}</h1>
					<Carousel
						images={product()?.images}
						index={Number(params.index)}
						productId={Number(params.id)}
					/>
				</Match>
			</Switch>
		</>
	);
};

export default Image;
