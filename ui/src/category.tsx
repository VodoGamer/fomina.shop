import { useParams } from "@solidjs/router";

import { type Component } from "solid-js";

const Category: Component = () => {
	const params = useParams();

	return (
		<h1>Приве</h1>
	);
}

export default Category;
