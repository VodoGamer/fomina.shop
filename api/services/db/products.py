from sqlalchemy import select
from sqlalchemy.orm import joinedload

from api.client import db
from api.services.db.models import Category, Product


async def get_products_for_category(category_slug: str):
    async with db() as session:
        result = await session.execute(
            select(Product).join(Category).where(Category.slug == category_slug)
        )
    return result.scalars().fetchall()


async def get_product(product_id: int):
    async with db() as session:
        result = await session.execute(
            select(Product).where(Product.id == product_id).options(joinedload(Product.images))
        )
    return result.scalar()


async def get_products(product_ids: list[int]):
    async with db() as session:
        result = await session.execute(select(Product).filter(Product.id.in_(product_ids)))
    return result.scalars().all()
