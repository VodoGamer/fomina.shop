import { Component } from "solid-js";

import Product from "./Product";

import styles from "./assets/products.module.sass";
import image from "./assets/image.png";

const Products: Component = () => {
	return (
		<div class={styles.products}>
			<Product id={1} title="Product 1" image={image} />
			<Product id={2} title="Product 2" image={image} />
			<Product id={3} title="Product 3" image={image} />
		</div>
	);
};

export default Products;
