from typing import Any

from pydantic import BaseModel

from . import ResponseError, make_post_request


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


async def calculate_delivery_count(from_location: str, to_location: str, weight: int) -> Any:
    return await make_post_request(
        "calculator/tarifflist",
        {
            "from_location": {"address": from_location},
            "to_location": {"address": to_location},
            "packages": {"weight": weight},
        },
    )
