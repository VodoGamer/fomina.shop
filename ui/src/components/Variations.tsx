import axios from "axios";
import { Variation } from "../types/variation";
import { For, createResource } from "solid-js";

async function fetchVariations(productId: number) {
	const request = await axios.get<[Variation]>(
		`${import.meta.env.VITE_BASE_API_URL}/variations/${productId}`,
	);
	return request.data;
}

export default function Variations(props: { productId: number }) {
	const [variations] = createResource(props.productId, fetchVariations);

	var ageHeight = variations()?.filter((obj) => obj.type === "Возраст, рост");
	return (
		<>
			<label>Возраст, рост:</label>
			<select>
				<For each={ageHeight}>{(variation: Variation) => <option>{variation.value}</option>}</For>
			</select>
		</>
	);
}
