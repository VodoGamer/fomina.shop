import asyncio

from fastapi import APIRouter

from api.services.db.payments import (
    delete_payment_and_order,
    get_all_payments,
    update_payment_status,
)
from api.services.telegram.notifications import send_notification_to_sellers
from api.services.yookassa.models import PaymentStatus
from api.services.yookassa.payments import get_payment_by_id

router = APIRouter()


async def payments_status_daemon():
    while True:
        db_payments = await get_all_payments()
        for db_payment in db_payments:
            api_payment = await get_payment_by_id(db_payment.id)
            if api_payment.status == PaymentStatus.canceled:
                await delete_payment_and_order(db_payment.id, db_payment.order_id)
            if (
                api_payment.status == PaymentStatus.succeeded
                and db_payment.status != PaymentStatus.succeeded
            ):
                await send_notification_to_sellers(
                    f"Пришёл новый заказ №{db_payment.id} на {api_payment.amount.value}₽"
                )
                await update_payment_status(db_payment.id, api_payment.status)
        await asyncio.sleep(5)
