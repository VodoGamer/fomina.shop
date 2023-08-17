from uuid import UUID

from fastapi import APIRouter

from api.services.yookassa.models import ApiPayment
from api.services.yookassa.payments import get_payment_by_id

router = APIRouter(tags=["payments"])


@router.get("/payment")
async def get_payment(payment_id: UUID) -> ApiPayment:
    return await get_payment_by_id(payment_id)
