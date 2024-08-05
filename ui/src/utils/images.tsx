import apiURL from "./api/base";

export function getImageUrl(filename: string) {
	return `${apiURL}/files/${filename}`;
}

export function getCompressedImageUrl(url: string) {
	return `${url}?fm=webp`;
}
