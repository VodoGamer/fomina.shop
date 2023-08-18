import pydantic
from fastapi import APIRouter

from api.env import BASE_UI_URL
from api.services.db.orders import add_products_to_order, create_order
from api.services.db.payments import create_payment
from api.services.yookassa.payments import ApiPayment, create_api_payment

router = APIRouter(tags=["orders"])


class OrderModel(pydantic.BaseModel):
    full_name: str
    address: str
    phone: int
    email: str
    amount: int
    product_ids: list[int]


@router.post("/order")
async def new_order(order: OrderModel) -> ApiPayment:
    order_id = await create_order(order.full_name, order.address, order.phone, order.email)
    await add_products_to_order(order_id, order.product_ids)
    api_payment = await create_api_payment(
        order.amount, f"{BASE_UI_URL}/payment/{order_id}", description="Покупка"
    )
    await create_payment(api_payment, order_id)
    return api_payment
