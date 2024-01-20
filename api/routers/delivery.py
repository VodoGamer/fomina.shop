from fastapi import APIRouter

from api.services.sdek import ResponseError
from api.services.sdek.cities import CityFoundResponse, find_city
from api.services.sdek.delivery import (
    DeliveryPostalCodes,
    DeliveryResponse,
    calculate_delivery_count,
)
from api.services.sdek.regions import RegionFoundResponse, find_region

router = APIRouter(tags=["delivery"])


@router.get("/calculate")
async def handle_delivery_calculate(
    from_postal: int, to_postal: int, weight: int
) -> DeliveryResponse:
    return await calculate_delivery_count(DeliveryPostalCodes(from_postal, to_postal), weight)


@router.get("/city")
async def handle_city_found(
    country_codes: str | None = None, postal_code: int | None = None, name: str | None = None
) -> list[CityFoundResponse] | ResponseError:
    return await find_city(**locals())


@router.get("/region")
async def handle_region_found(
    country_codes: str | None = None,
) -> list[RegionFoundResponse] | ResponseError:
    return await find_region(country_codes)
