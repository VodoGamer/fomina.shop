from sqlalchemy import select

from src.database.models import Category

from .abc import ABCRepository


class CategoryRepository(ABCRepository):
    async def get_all(self) -> list[Category]:
        async with self.session() as session:
            result = await session.execute(select(Category).order_by(Category.updated_at.desc()))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> Category | None:
        async with self.session() as session:
            result = await session.execute(select(Category).where(Category.id == id))
            return result.scalars().first()

    async def get_by_slug(self, slug: str) -> Category | None:
        async with self.session() as session:
            result = await session.execute(select(Category).where(Category.slug == slug))
            return result.scalars().first()
