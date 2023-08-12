from sqlalchemy import select

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
        result = await session.execute(select(Product).where(Product.id == product_id))
    return result.scalar()
