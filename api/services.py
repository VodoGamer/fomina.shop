from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from api.models import Category, Image, Product


async def get_categories(db: async_sessionmaker[AsyncSession]):
    async with db() as session:
        result = await session.execute(select(Category))
    return result.scalars().fetchall()


async def get_category(db: async_sessionmaker[AsyncSession], category_slug: str):
    async with db() as session:
        result = await session.execute(select(Category).where(Category.slug == category_slug))
    return result.scalar()


async def get_category_products(db: async_sessionmaker[AsyncSession], category_slug: str):
    async with db() as session:
        result = await session.execute(
            select(Product).join(Category).where(Category.slug == category_slug)
        )
    return result.scalars().fetchall()


async def get_product_images(
    db: async_sessionmaker[AsyncSession], product_id: int, limit: int | None = None
):
    async with db() as session:
        result = await session.execute(
            select(Image).where(Image.product_id == product_id).limit(limit)
        )
    return result.scalars().all()


async def get_product(db: async_sessionmaker[AsyncSession], product_id: int):
    async with db() as session:
        result = await session.execute(select(Product).where(Product.id == product_id))
    return result.scalar()
