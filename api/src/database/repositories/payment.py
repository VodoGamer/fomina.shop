from uuid import UUID

from sqlalchemy import select, update

from src.database.models import Payment, PaymentStatus

from .abc import ABCRepository


class PaymentRepository(ABCRepository):
    async def get_all(self) -> list[Payment]:
        async with self.session() as session:
            result = await session.execute(select(Payment))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> Payment | None:
        async with self.session() as session:
            result = await session.execute(select(Payment).where(Payment.id == id))
            return result.scalars().first()

    async def create(self, id: UUID, order_id: int, status: str, price: int) -> int:
        async with self.session() as session:
            payment = Payment(id=id, order_id=order_id, status=status, price=price)
            session.add(payment)
            await session.commit()
            return payment.id

    async def change_status(self, id: UUID, status: PaymentStatus) -> None:
        async with self.session() as session:
            await session.execute(update(Payment).where(Payment.id == id).values(status=status))
            await session.commit()
