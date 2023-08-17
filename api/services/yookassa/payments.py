from uuid import UUID

import ujson

from api.services.yookassa import make_get_request, make_post_request
from api.services.yookassa.models import ApiPayment


async def create_api_payment(value: int, return_url: str, description: str) -> ApiPayment:
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
    return ApiPayment(**ujson.loads(payment_response))


async def get_payment_by_id(id: UUID) -> ApiPayment:
    payment_response = await make_get_request(f"payments/{str(id)}")
    return ApiPayment(**ujson.loads(payment_response))
