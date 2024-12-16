import uuid

from pydantic import BaseModel, Field
from yookassa import Configuration, Payment
from yookassa.payment import PaymentResponse

from src.database.repository import DatabaseRepository
from src.env import YOOKASSA_ACCOUNT_ID, YOOKASSA_SECRET_KEY

Configuration.account_id = YOOKASSA_ACCOUNT_ID
Configuration.secret_key = YOOKASSA_SECRET_KEY


class ProductOrder(BaseModel):
    id: int = Field(validation_alias="product_id")
    quantity: int = Field(default=1, validation_alias="count")
    variation_ids: list[int] = Field(validation_alias="variations")


async def create_payment(
    price: float | int,
    return_url: str,
    description: str,
    order_products: list[ProductOrder],
    full_name: str,
    email: str,
    phone_number: str,
    delivery_price: int,
) -> PaymentResponse:
    receipt = await _get_receipt(order_products, full_name, email, phone_number, delivery_price)
    data = _get_payment_data(float(price), return_url, description)
    data.update(receipt)
    return Payment.create(data, uuid.uuid4())


def cancel_payment(payment_id: str) -> None:
    Payment.cancel(payment_id)


async def _get_receipt(
    order_products: list[ProductOrder],
    full_name: str,
    email: str,
    phone_number: str,
    delivery_price: int,
) -> dict:
    return {
        "receipt": {
            "customer": {"full_name": full_name, "email": email, "phone": phone_number},
            "items": await _get_receipt_items(order_products, delivery_price),
        }
    }


async def _get_receipt_items(order_products: list[ProductOrder], delivery_price: int) -> list:
    receipt_items: list[dict] = []
    for order_product in order_products:
        product = await DatabaseRepository().product.get_by_id(order_product.id)
        if not product:
            raise ValueError
        variations = [
            await DatabaseRepository().product_variation.get_by_id(id)
            for id in order_product.variation_ids
        ]
        variation_options = [f"{v.key.value} - {v.value}" for v in variations if v]
        variation_sum = sum([v.price_markup for v in variations if v])
        receipt_items.append(
            _get_receipt_item(
                description=f"{product.title} [{', '.join(variation_options)}]",
                quantity=order_product.quantity,
                price=float(product.price + variation_sum),
            )
        )
    receipt_items.append(
        _get_receipt_item(
            description="Доставка",
            price=float(delivery_price),
            payment_subject="service",
            measure="another",
        )
    )
    return receipt_items


def _get_receipt_item(
    description: str,
    price: float,
    quantity: int = 1,
    measure: str = "piece",
    payment_subject: str = "commodity",
) -> dict:
    return {
        "description": description,
        "quantity": quantity,
        "amount": {
            "value": str(price),
            "currency": "RUB",
        },
        "vat_code": 1,
        "measure": measure,
        "payment_subject": payment_subject,
        "payment_mode": "full_prepayment",
    }


def _get_payment_data(price: float, return_url: str, description: str) -> dict:
    return {
        "amount": {"value": str(price), "currency": "RUB"},
        "confirmation": {
            "type": "redirect",
            "return_url": return_url,
        },
        "capture": True,
        "description": description,
    }
