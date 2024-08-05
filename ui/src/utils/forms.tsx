export function getVariations(): number[] {
	const variations: number[] = [];
	for (let i = 0; i < document.forms[0].length; i++) {
		const field: HTMLSelectElement = document.forms[0][i];
		const id = Number(field.options[field.options.selectedIndex].id);
		variations.push(id);
	}
	return variations;
}
