from sqlalchemy import select

from api.database.models import ProductImage

from .abc import ABCRepository


class ProductImageRepository(ABCRepository):
    async def get_all(self) -> list[ProductImage]:
        async with self.session() as session:
            result = await session.execute(select(ProductImage))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> ProductImage | None:
        async with self.session() as session:
            result = await session.execute(select(ProductImage).where(ProductImage.id == id))
            return result.scalars().first()
