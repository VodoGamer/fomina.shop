export interface Geoname {
	geonameId: number;
	name: string;
	countryName: string;
	adminName1: string;
}

export interface GeonamesResponse {
	totalResultsCount: number;
	geonames: Geoname[];
}
