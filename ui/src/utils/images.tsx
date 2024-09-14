import type Image from "~/interfaces/image";

import apiURL from "./api";

export function getImageUrl(
	filename?: string,
	isCompressed: boolean = true,
): string | undefined {
	if (!filename) return undefined;
	return `${apiURL}/files/${filename}${isCompressed ? "?fm=webp" : ""}`;
}

export function getCompressedImageUrl(filename?: string): string | undefined {
	if (!filename) return undefined;
	return getImageUrl(filename, true);
}

export function getImagesFromIndex(index: number, images: Image[]) {
	const buffer = images;
	const result: Image[] = images.slice(index);
	return result.concat(buffer.slice(0, index));
}
