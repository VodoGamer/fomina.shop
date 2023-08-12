from sqlalchemy import select

from api.client import db
from api.services.db.models import Category


async def get_categories():
    async with db() as session:
        result = await session.execute(select(Category))
    return result.scalars().fetchall()


async def get_category(category_slug: str):
    async with db() as session:
        result = await session.execute(select(Category).where(Category.slug == category_slug))
    return result.scalar()
