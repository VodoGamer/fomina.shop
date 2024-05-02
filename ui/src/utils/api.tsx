import axios, { AxiosRequestConfig } from "axios";

const apiURL = import.meta.env.VITE_BASE_API_URL;

export async function getFromApi(url: string, config?: AxiosRequestConfig) {
  return await axios.get(import.meta.env.VITE_BASE_API_URL + "/" + url, config);
}

export default apiURL;
