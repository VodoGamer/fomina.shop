import apiURL from "./api";

import type Image from "~/interfaces/image";

export function getImageUrl(filename?: string): string | undefined {
	if (!filename) return undefined;
	return `${apiURL}/files/${filename}`;
}

export function getCompressedImageUrl(filename?: string): string | undefined {
	if (!filename) return undefined;
	return `${getImageUrl(filename)}?fm=webp`;
}

export function getImagesFromIndex(index: number, images: Image[]) {
	const buffer = images;
	const result: Image[] = images.slice(index);
	return result.concat(buffer.slice(0, index));
}
