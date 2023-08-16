import pydantic
from fastapi import APIRouter

from api.env import BASE_UI_URL
from api.services.db.orders import create_order
from api.services.db.payments import create_payment
from api.services.yookassa.payments import create_api_payment

router = APIRouter(tags=["orders"])


class OrderModel(pydantic.BaseModel):
    full_name: str
    address: str
    phone: int
    email: str
    amount: int


@router.post("/order")
async def new_order(order: OrderModel):
    order_id = await create_order(order.full_name, order.address, order.phone, order.email)
    api_payment = await create_api_payment(order.amount, BASE_UI_URL, description="Покупка")
    await create_payment(api_payment, order_id)
    return api_payment.confirmation.confirmation_url
