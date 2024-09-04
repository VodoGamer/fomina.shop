import { Match, type Setter, Suspense, Switch, createResource } from "solid-js";

import { getSdekPoints } from "~/utils/delivery";

import ErrorBox from "../ErrorBox";
import { InputWithFuse } from "../InputWithFuse";
import { Loader } from "../Loader";

export default function SdekPoints(props: {
	city?: string;
	setAddress: Setter<string | undefined>;
}) {
	const [points] = createResource(props.city, getSdekPoints);

	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<Match when={points.error}>
					<ErrorBox message="Не удалось получить список пунктов выдачи" />
				</Match>
				<Match when={points()}>
					<InputWithFuse
						setInputText={props.setAddress}
						labelText="Адрес пункта выдачи заказов СДЭК"
						options={points()?.map((p) => p.location.address) || []}
						id="address"
					/>
				</Match>
			</Switch>
		</Suspense>
	);
}
