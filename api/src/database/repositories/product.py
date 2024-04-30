from sqlalchemy import select

from src.database.models import Product

from .abc import ABCRepository


class ProductRepository(ABCRepository):
    async def get_all(self) -> list[Product]:
        async with self.session() as session:
            result = await session.execute(select(Product))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> Product | None:
        async with self.session() as session:
            result = await session.execute(select(Product).where(Product.id == id))
            return result.scalars().first()

    async def get_by_category(self, category_id: int) -> list[Product]:
        async with self.session() as session:
            result = await session.execute(
                select(Product).where(Product.categories.any(id=category_id))
            )
            return list(result.scalars().all())
