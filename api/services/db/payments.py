from api.client import db
from api.services.db.models import Payment
from api.services.yookassa.models import ApiPayment


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
