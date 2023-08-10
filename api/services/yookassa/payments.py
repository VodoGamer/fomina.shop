from uuid import UUID

import msgspec
import ujson

from api.services.yookassa import make_get_request, make_post_request
from api.services.yookassa.models import Payment, PaymentStatus


async def make_payment(value: int, return_url: str, description: str) -> str | None:
    payment_response = await make_post_request(
        method="payments",
        data=ujson.dumps(
            {
                "amount": {"value": value, "currency": "RUB"},
                "capture": True,
                "confirmation": {
                    "type": "redirect",
                    "return_url": return_url,
                },
                "description": description,
            }
        ),
    )
    payment = msgspec.json.decode(payment_response, type=Payment)
    return (
        payment.confirmation.confirmation_url if payment.status is PaymentStatus.pending else None
    )


async def get_payment(id: UUID) -> Payment:
    payment_response = await make_get_request(f"payments/{str(id)}")
    return msgspec.json.decode(payment_response, type=Payment)
