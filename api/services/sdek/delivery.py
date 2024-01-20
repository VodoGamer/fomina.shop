from dataclasses import dataclass
from typing import Any

from pydantic import BaseModel

from . import ResponseError, make_post_request


@dataclass(frozen=True, slots=True)
class DeliveryPostalCodes:
    from_location: int
    to_location: int


class DeliveryTariff(BaseModel):
    tariff_code: int
    tariff_name: str
    tariff_description: str
    delivery_mode: int
    delivery_sum: float
    period_min: int
    period_max: int
    calendar_min: int
    calendar_max: int


class DeliveryResponse(BaseModel):
    tariff_codes: list[DeliveryTariff] | None = None
    errors: list[ResponseError] | None = None


async def calculate_delivery_count(postal_codes: DeliveryPostalCodes, weight: int) -> Any:
    return await make_post_request(
        "calculator/tarifflist",
        {
            "from_location": {"postal_code": postal_codes.from_location},
            "to_location": {"postal_code": postal_codes.to_location},
            "packages": {"weight": weight},
        },
    )
