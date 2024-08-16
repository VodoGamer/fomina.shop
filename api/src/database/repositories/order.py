from sqlalchemy import select

from src.database.models import Order

from .abc import ABCRepository


class OrderRepository(ABCRepository):
    async def get_all(self) -> list[Order]:
        async with self.session() as session:
            result = await session.execute(select(Order))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> Order | None:
        async with self.session() as session:
            result = await session.execute(select(Order).where(Order.id == id))
            return result.scalars().first()
