from fastapi import APIRouter

from api.services.db.payments import get_payment_by_order_id
from api.services.yookassa.models import ApiPayment
from api.services.yookassa.payments import get_payment_by_id

router = APIRouter(tags=["payments"])


@router.get("/payment")
async def get_payment_by_order(order_id: int) -> ApiPayment:
    payment = await get_payment_by_order_id(order_id)
    return await get_payment_by_id(payment.id)
