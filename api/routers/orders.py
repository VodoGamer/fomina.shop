from fastapi import APIRouter

from api.env import BASE_UI_URL
from api.services.db.orders import create_order
from api.services.db.payments import create_payment
from api.services.yookassa.payments import create_api_payment

router = APIRouter(tags=["orders"])


@router.post("/order")
async def new_order(
    full_name: str, address: str, phone: int, email: str, product_ids: str, amount: int
):
    order_id = await create_order(full_name, address, phone, email)
    api_payment = await create_api_payment(amount, BASE_UI_URL, description="Покупка")
    await create_payment(api_payment, order_id)
    return api_payment
