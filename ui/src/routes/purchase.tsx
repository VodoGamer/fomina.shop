import { MetaProvider, Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";

import { Loader } from "~/components/Loader";

const ClientOnlyPurchase = clientOnly(() => import("~/components/purchase"));

export default function PurchasePage() {
	return (
		<>
			<MetaProvider>
				<Title>Оформление заказа - Fomina Style</Title>
			</MetaProvider>
			<ClientOnlyPurchase fallback={<Loader />} />
		</>
	);
}
