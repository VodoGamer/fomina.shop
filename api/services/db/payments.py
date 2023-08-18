from uuid import UUID

from sqlalchemy import delete, select, update

from api.client import db
from api.services.db.models import Order, Payment
from api.services.yookassa.models import ApiPayment, PaymentStatus


async def create_payment(api_payment: ApiPayment, order_id: int):
    payment = Payment(
        id=api_payment.id,
        amount=int(float(api_payment.amount.value)),
        status=api_payment.status,
        order_id=order_id,
    )
    async with db() as session:
        session.add(payment)
        await session.commit()


async def get_all_payments():
    async with db() as session:
        result = await session.execute(select(Payment))
    return result.scalars().all()


async def delete_payment_and_order(payment_id: UUID, order_id):
    async with db() as session:
        await session.execute(delete(Payment).where(Payment.id == payment_id))
        await session.execute(delete(Order).where(Order.id == order_id))
        await session.commit()


async def update_payment_status(payment_id: UUID, new_status: PaymentStatus):
    async with db() as session:
        await session.execute(
            update(Payment).where(Payment.id == payment_id).values(status=new_status)
        )
        await session.commit()


async def get_payment_by_order_id(order_id: int):
    async with db() as session:
        result = await session.execute(select(Payment).where(Payment.order_id == order_id))
    return result.scalars().one()
