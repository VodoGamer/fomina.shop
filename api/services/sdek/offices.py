from typing import Any
from uuid import UUID

from pydantic import BaseModel

from . import make_get_request


class DeliveryPointLocation(BaseModel):
    country_code: str
    region_code: int
    region: str
    city_code: int
    city: str
    longitude: float
    latitude: float
    address: str
    address_full: str


class DeliveryPoint(BaseModel):
    code: str
    uuid: UUID
    location: DeliveryPointLocation
    work_time: str
    is_dressing_room: bool


async def get_delivery_points_in_city(
    city_code: int, weight_min: int | None = None, weight_max: int | None = None
) -> Any:
    return await make_get_request(
        "deliverypoints",
        {
            "city_code": city_code,
            "is_handout": 1,
            "weight_min": weight_min or "",
            "weight_max": weight_max or "",
        },
    )
