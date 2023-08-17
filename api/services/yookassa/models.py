from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class PaymentConfirmation(BaseModel):
    type: str
    confirmation_url: str


class PaymentStatus(Enum):
    pending = "pending"
    waiting_for_capture = "waiting_for_capture"
    succeeded = "succeeded"
    canceled = "canceled"


class AmountCurrency(Enum):
    rub = "RUB"


class PaymentAmount(BaseModel):
    value: int
    currency: AmountCurrency


class ApiPayment(BaseModel):
    id: UUID
    status: PaymentStatus
    amount: PaymentAmount
    description: str
    confirmation: PaymentConfirmation | None = None
