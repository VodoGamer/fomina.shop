import axios, { AxiosRequestConfig } from "axios";

export async function getFromApi(url: string, config?: AxiosRequestConfig) {
  console.log(import.meta.env.VITE_BASE_API_URL + "/" + url);
  return await axios.get(import.meta.env.VITE_BASE_API_URL + "/" + url, config);
}
