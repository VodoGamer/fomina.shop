from fastapi import APIRouter
from pydantic import BaseModel

from api.services.sdek.cities import CityFoundResponse, find_city
from api.services.sdek.delivery import DeliveryTariff, calculate_delivery_count
from api.services.sdek.offices import DeliveryPoint, get_delivery_points_in_city
from api.services.sdek.regions import RegionFoundResponse, find_region

router = APIRouter(tags=["delivery"])


@router.get("/calculate")
async def handle_delivery_calculate(
    from_office_code: str, to_office_code: str, weight: int
) -> list[DeliveryTariff]:
    return (await calculate_delivery_count(from_office_code, to_office_code, weight))[
        "tariff_codes"
    ]


@router.get("/city")
async def handle_city_found(
    country_codes: str | None = None, postal_code: int | None = None, name: str | None = None
) -> list[CityFoundResponse]:
    return await find_city(**locals())


@router.get("/regions")
async def get_regions_of_country(
    country_codes: str | None = None,
) -> list[RegionFoundResponse]:
    return await find_region(country_codes)


@router.get("/delivery_points")
async def find_delivery_points(
    city_code: int, weight_min: int | None = None, weight_max: int | None = None
) -> list[DeliveryPoint]:
    return await get_delivery_points_in_city(city_code, weight_min, weight_max)


class DeliveryCountry(BaseModel):
    country: str
    country_code: str


@router.get("/countries")
async def get_countries_list(unique: bool = True) -> list[DeliveryCountry]:
    countries = await find_region()
    if not unique:
        return countries
    result: list[DeliveryCountry] = []
    for country in countries:
        country = DeliveryCountry(**country)
        if country not in result:
            result.append(country)
    return result
