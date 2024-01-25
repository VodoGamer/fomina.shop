export type DeliveryOfficeLocation = {
	country_code: string;
	region_code: number;
	region: string;
	city_code: number;
	city: string;
	address: string;
	address_full: string;
};

export type DeliveryOffice = {
	code: string;
	work_time: string;
	location: DeliveryOfficeLocation;
	is_dressing_room: boolean;
};
