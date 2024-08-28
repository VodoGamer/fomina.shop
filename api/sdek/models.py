import enum
from typing import Literal

from pydantic import BaseModel


class Error(BaseModel):
    code: str
    message: str


class ErrorsResponse(BaseModel):
    errors: list[Error]


class TokenResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"]
    expires_in: int
    scope: str
    jti: str


class DeliveryTariff(enum.IntEnum):
    Warehouse = 136
    Courier = 137


class CalculatorResponse(BaseModel):
    period_min: int
    period_max: int
    total_sum: int
    currency: str
