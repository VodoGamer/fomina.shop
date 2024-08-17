import uuid

from yookassa import Configuration, Payment
from yookassa.payment import PaymentResponse

from src.env import YOOKASSA_ACCOUNT_ID, YOOKASSA_SECRET_KEY

Configuration.account_id = YOOKASSA_ACCOUNT_ID
Configuration.secret_key = YOOKASSA_SECRET_KEY


def create_payment(price: float | int, return_url: str, description: str) -> PaymentResponse:
    return Payment.create(
        {
            "amount": {"value": str(price), "currency": "RUB"},
            "confirmation": {
                "type": "redirect",
                "return_url": return_url,
            },
            "capture": True,
            "description": description,
        },
        uuid.uuid4(),
    )


def cancel_payment(payment_id: str) -> None:
    Payment.cancel(payment_id)
