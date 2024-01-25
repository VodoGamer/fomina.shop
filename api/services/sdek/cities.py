from typing import Any

from pydantic import BaseModel

from . import make_get_request


class CityFoundResponse(BaseModel):
    code: int
    city: str
    code: int
    country_code: str
    country: str
    region: str
    region_code: int


async def find_city(
    country_codes: str | None = None, postal_code: int | None = None, name: str | None = None
) -> Any:
    return await make_get_request(
        "location/cities",
        {
            "country_codes": country_codes or "",
            "postal_code": postal_code or "",
            "city": name or "",
            "limit": -1,
        },
    )
