import axios, { type AxiosRequestConfig } from "axios";

import type ProductVariation from "../interfaces/productVariation";

const apiURL = import.meta.env.VITE_BASE_API_URL;

export async function getFromApi(url: string, config?: AxiosRequestConfig) {
	return await axios.get(`${import.meta.env.VITE_BASE_API_URL}/${url}`, config);
}

export async function postApi(
	url: string,
	data: object,
	config?: AxiosRequestConfig,
) {
	return await axios.post(
		`${import.meta.env.VITE_BASE_API_URL}/${url}`,
		data,
		config,
	);
}

export async function getVariation(id: number): Promise<ProductVariation> {
	return (await getFromApi(`variation/${id}`)).data;
}

export default apiURL;
