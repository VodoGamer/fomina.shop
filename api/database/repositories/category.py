from sqlalchemy import select

from api.models import Category

from .abc import ABCRepository


class CategoryRepository(ABCRepository):
    async def get_all(self) -> list[Category]:
        async with self.session() as session:
            result = await session.execute(select(Category))
            return list(result.scalars().all())
