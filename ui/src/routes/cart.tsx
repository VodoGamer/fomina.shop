import { MetaProvider, Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";

import { Loader } from "~/components/Loader";

const ClientOnlyCart = clientOnly(() => import("~/components/CartItems"));

export default function Cart() {
	return (
		<>
			<MetaProvider>
				<Title>Корзина - Fomina Style</Title>
			</MetaProvider>
			<ClientOnlyCart fallback={<Loader />} />
		</>
	);
}
