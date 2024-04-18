import { Component } from "solid-js";
import { useParams } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import styles from "../assets/styles/product.module.sass";

import Hero from "../components/Hero";
import image from "../components/Products/assets/image.png";

const Product: Component = () => {
	const params: { id: string } = useParams();

	return (
		<>
			<MetaProvider>
				<Title>Product page - Fomina</Title>
			</MetaProvider>
			<Hero image={image} title={`Product ${params.id}`} />
			<div class={styles.product}>
				<p class={styles.product__description}>
					Описание товара на большое количество символов.... Lorem ipsum dolor
					sit amet, consectetur adipiscing elit. Nulla viverra velit in viverra
					lobortis. Duis vitae arcu fermentum, porttitor sem quis, ornare nibh.
					Morbi imperdiet fermentum sem quis tristique. Mauris ac turpis eget
					nulla rhoncus aliquet. Quisque cursus bibendum justo, gravida varius
					ligula posuere a. Morbi sodales nunc a tellus mollis, a rhoncus arcu
					malesuada. Class aptent taciti sociosqu ad litora torquent per conubia
					nostra, per inceptos himenaeos. Nulla molestie at lorem blandit
					lobortis. Praesent facilisis at neque sed varius.
				</p>
				<span class={styles.product__price}>1200₽</span>
			</div>
		</>
	);
};

export default Product;
