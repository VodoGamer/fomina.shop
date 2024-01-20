from typing import Any

from pydantic import BaseModel

from . import make_get_request


class RegionFoundResponse(BaseModel):
    country: str
    country_code: str
    region: str


async def find_region(country_codes: str | None = None) -> Any:
    return await make_get_request("location/regions", {"country_codes": country_codes or ""})
