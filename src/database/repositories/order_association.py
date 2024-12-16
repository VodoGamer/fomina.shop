from sqlalchemy import join, select

from src.database.models import OrderAssociation, Product, ProductVariation

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

    async def get_products_by_order(self, order_id: int) -> list[Product]:
        async with self.session() as session:
            result = await session.execute(
                select(Product)
                .where(OrderAssociation.order_id == order_id)
                .select_from(
                    join(
                        OrderAssociation, Product, OrderAssociation.product_id == Product.id
                    ).join(ProductVariation, OrderAssociation.variation_id == ProductVariation.id)
                )
            )
            return list(result.scalars().all())

    async def get_variations_by_order(self, order_id: int) -> list[ProductVariation]:
        async with self.session() as session:
            result = await session.execute(
                select(ProductVariation)
                .where(OrderAssociation.order_id == order_id)
                .select_from(
                    join(
                        OrderAssociation, Product, OrderAssociation.product_id == Product.id
                    ).join(ProductVariation, OrderAssociation.variation_id == ProductVariation.id)
                )
            )
            return list(result.scalars().all())

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
