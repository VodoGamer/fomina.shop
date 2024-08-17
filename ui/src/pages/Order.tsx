import { MetaProvider, Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import OrderConfirmation from "../components/OrderConfirmation";

export default function Order() {
	const params: { id: string } = useParams();

	return (
		<>
			<MetaProvider>
				<Title>Подтверждение заказа - Fomina Style</Title>
			</MetaProvider>
			<h1>Подтверждение заказа</h1>
			<OrderConfirmation orderId={Number(params.id)} />
		</>
	);
}
