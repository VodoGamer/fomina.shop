import apiURL from "./api";

export function getImageUrl(filename: string) {
	return `${apiURL}/files/${filename}`;
}

export function getCompressedImageUrl(url: string) {
	return `${url}?fm=webp`;
}
