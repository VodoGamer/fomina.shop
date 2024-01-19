from sqlalchemy import select

from api.client import db
from api.services.db.models import Product, ProductVariation


async def get_variation_for_product(product_id: int):
    async with db() as session:
        result = await session.execute(
            select(ProductVariation).join(Product).where(Product.id == product_id)
        )
    return result.scalars().all()
