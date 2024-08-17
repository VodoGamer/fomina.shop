from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from src.database.models import Product
from src.database.repository import DatabaseRepository
from src.env import UI_URL
from src.services.pay import cancel_payment, create_payment

router = APIRouter(tags=["orders"])

DELIVERY_PRICE = 700


class OrderItem(BaseModel):
    product_ids: list[int]
    name: str
    address: str
    phone_number: str
    email: str


@router.post("/order")
async def create_order(item: OrderItem):
    products: list[Product] = []
    for product_id in item.product_ids:
        response = await DatabaseRepository().product.get_by_id(product_id)
        if not (response):
            return HTMLResponse(status_code=406)
        products.append(response)
    order_id = await DatabaseRepository().order.create(
        products, item.name, item.address, item.phone_number, item.email
    )
    price = sum([product.price for product in products]) + DELIVERY_PRICE
    payment = create_payment(
        price=price,
        return_url=UI_URL + f"/order/{order_id}",
        description=f"Оплата заказа №{order_id} от {item.email}",
    )
    if not payment.confirmation or not payment.status or not payment.id:
        if payment.id:
            cancel_payment(payment.id)
        return HTMLResponse(status_code=500)
    await DatabaseRepository().payment.create(payment.id, order_id, payment.status, price)
    return payment.confirmation.confirmation_url


@router.get("/order/{id}")
async def get_order(id: int):
    response = await DatabaseRepository().order.get_by_id(id)
    return response or HTMLResponse(status_code=404)
