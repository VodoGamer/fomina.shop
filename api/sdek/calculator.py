from typing import NamedTuple

import orjson

from sdek.http_client import HttpClient
from sdek.models import CalculatorResponse, DeliveryTariff
from src.env import SDEK_SENDER_ADDRESS


class Size(NamedTuple):
    width: int
    length: int
    height: int


async def calculate_delivery(
    tariff: DeliveryTariff, to_address: str, size: Size, weight: int
) -> CalculatorResponse:
    response = await HttpClient().calculate_delivery(
        tariff, SDEK_SENDER_ADDRESS, to_address, *size, weight
    )
    return CalculatorResponse(**orjson.loads(response))
