import error from "../../static/icons/error.svg";

export default function PurchaseError(props: { errorText: string }) {
	return (
		<div class="purchase__error">
			<img src={error} alt="" />
			<p>{props.errorText}</p>
		</div>
	);
}
