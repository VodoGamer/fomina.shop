from sqlalchemy import select

from api.models import Product

from .abc import ABCRepository


class ProductRepository(ABCRepository):
    async def get_all(self) -> list[Product]:
        async with self.session() as session:
            result = await session.execute(select(Product))
            return list(result.scalars().all())
