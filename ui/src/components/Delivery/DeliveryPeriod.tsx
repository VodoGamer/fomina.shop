import { Match, type Resource, Show, Suspense, Switch } from "solid-js";

import type { SdekCalculateResponse } from "~/interfaces/sdek";

import ErrorBox from "../ErrorBox";
import { Loader } from "../Loader";

export default function DeliveryPeriod(props: {
	deliveryInfo: Resource<SdekCalculateResponse>;
}) {
	const deliveryInfo = props.deliveryInfo;
	return (
		<Suspense fallback={<Loader />}>
			<Show when={deliveryInfo.loading}>
				<Loader />
			</Show>
			<Switch>
				<Match when={deliveryInfo.error}>
					<ErrorBox message="Не удалось получить информацию о доставке" />
				</Match>
				<Match when={deliveryInfo()}>
					<p>
						Доставка займёт примерно (в днях): {deliveryInfo()?.period_min}{" "}
						<Show
							when={
								!(deliveryInfo()?.period_max === deliveryInfo()?.period_min)
							}
						>
							{" "}
							- {deliveryInfo()?.period_max}
						</Show>
					</p>
				</Match>
			</Switch>
		</Suspense>
	);
}
