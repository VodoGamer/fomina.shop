import axios from "axios";
import type { GeonamesResponse } from "../interfaces/geonames";

const geonamesUser = import.meta.env.VITE_GEONAMES_USER;

export async function getCities(cityName: string): Promise<GeonamesResponse> {
	"use server";
	const url = `http://api.geonames.org/search?username=${geonamesUser}&type=json&lang=ru&featureClass=P&cities=cities1000&name=${cityName}`;
	return (await axios.get(url)).data;
}
