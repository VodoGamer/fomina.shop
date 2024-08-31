from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field

from sdek.calculator import Size, calculate_delivery
from sdek.models import DeliveryTariff
from src.database.repository import DatabaseRepository
from src.env import UI_URL
from src.services.pay import cancel_payment, create_payment

router = APIRouter(tags=["orders"])


class ProductOrder(BaseModel):
    id: int = Field(validation_alias="product_id")
    quantity: int = Field(default=1, validation_alias="count")
    variation_ids: list[int] = Field(validation_alias="variations")


class OrderItem(BaseModel):
    products: list[ProductOrder]
    name: str
    delivery_method: str
    city: str
    address: str
    phone_number: str
    email: str


async def calculate_price(
    order_products: list[ProductOrder], tariff: DeliveryTariff, city: str, address: str
) -> int:
    price = 0
    for order_product in order_products:
        product = await DatabaseRepository().product.get_by_id(order_product.id)
        if not product:
            raise ValueError
        for variation_id in order_product.variation_ids:
            variation = await DatabaseRepository().product_variation.get_by_id(variation_id)
            if not variation:
                raise ValueError
            product.price += variation.price_markup if variation else 0
        price += product.price * order_product.quantity
    price += (
        await calculate_delivery(tariff, f"{city} {address}", Size(20, 20, 4), 300)
    ).total_sum
    return price


converter_map = {"СДЭК Курьер": DeliveryTariff.Courier, "СДЭК": DeliveryTariff.Warehouse}


@router.post("/order")
async def create_order(item: OrderItem):
    order = await DatabaseRepository().order.create(
        item.name, item.city, item.delivery_method, item.address, item.phone_number, item.email
    )
    for product in item.products:
        await DatabaseRepository().order_association.create(
            product.id, order.id, product.variation_ids, product.quantity
        )

    price = await calculate_price(
        item.products, converter_map[item.delivery_method], item.city, item.address
    )
    payment = create_payment(
        price=price,
        return_url=UI_URL + f"/order/{order.id}",
        description=f"Оплата заказа №{order.id} от {item.email}",
    )
    if not payment.confirmation or not payment.status or not payment.id:
        if payment.id:
            cancel_payment(payment.id)
        return HTMLResponse(status_code=500)
    await DatabaseRepository().payment.create(payment.id, order.id, payment.status, price)
    return payment.confirmation.confirmation_url


@router.get("/order/{id}")
async def get_order(id: int):
    response = await DatabaseRepository().order.get_by_id(id)
    return response or HTMLResponse(status_code=404)
