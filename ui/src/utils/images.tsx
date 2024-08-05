import apiURL from "./api";

import type Image from "../interfaces/image";

export function getImageUrl(filename: string) {
	return `${apiURL}/files/${filename}`;
}

export function getCompressedImageUrl(url: string) {
	return `${getImageUrl(url)}?fm=webp`;
}

export function getImagesFromIndex(index: number, images: Image[]) {
	const buffer = images;
	const result: Image[] = images.slice(index);
	return result.concat(buffer.slice(0, index));
}
