from enum import Enum
from uuid import UUID

import msgspec


class PaymentConfirmation(msgspec.Struct):
    type: str
    confirmation_url: str


class PaymentStatus(Enum):
    pending = "pending"
    waiting_for_capture = "waiting_for_capture"
    succeeded = "succeeded"
    canceled = "canceled"


class AmountCurrency(Enum):
    rub = "RUB"


class PaymentAmount(msgspec.Struct):
    value: str
    currency: AmountCurrency


class Payment(msgspec.Struct):
    id: UUID
    status: PaymentStatus
    amount: PaymentAmount
    description: str
    confirmation: PaymentConfirmation
