from sqlalchemy import select

from src.database.models import OrderAssociation

from .abc import ABCRepository


class OrderAssociationRepository(ABCRepository):
    async def get_all(self) -> list[OrderAssociation]:
        async with self.session() as session:
            result = await session.execute(select(OrderAssociation))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> OrderAssociation | None:
        async with self.session() as session:
            result = await session.execute(
                select(OrderAssociation).where(OrderAssociation.order_id == id)
            )
            return result.scalars().first()

    async def create(
        self, product_id: int, order_id: int, variation_ids: list[int], quantity: int
    ) -> None:
        async with self.session() as session:
            association = OrderAssociation()
            association.quantity = quantity
            association.order_id = order_id
            association.product_id = product_id
            for variation_id in variation_ids:
                association.variation_id = variation_id
                session.add(association)
            if len(variation_ids) <= 0:
                session.add(association)
            await session.commit()
