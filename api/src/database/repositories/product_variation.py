from sqlalchemy import select

from src.database.models import Product, ProductVariation

from .abc import ABCRepository


class ProductVariationRepository(ABCRepository):
    async def get_all(self) -> list[ProductVariation]:
        async with self.session() as session:
            result = await session.execute(select(ProductVariation))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> ProductVariation | None:
        async with self.session() as session:
            result = await session.execute(
                select(ProductVariation).where(ProductVariation.id == id)
            )
            return result.scalars().first()

    async def get_by_product_id(self, id: int) -> list[ProductVariation]:
        async with self.session() as session:
            result = await session.execute(select(ProductVariation).where(Product.id == id))
            return list(result.scalars().all())
