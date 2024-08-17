from sqlalchemy import select

from src.database.models import Order, Product

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

    async def create(
        self, products: list[Product], name: str, address: str, phone_number: str, email: str
    ) -> int:
        async with self.session() as session:
            order = Order(
                name=name,
                address=address,
                phone_number=phone_number,
                email=email,
                products=products,
            )
            session.add(order)
            await session.commit()
            return order.id
