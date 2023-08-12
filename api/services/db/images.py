from sqlalchemy import select

from api.client import db
from api.services.db.models import Image


async def get_images_for_product(product_id: int, limit: int | None = None):
    async with db() as session:
        result = await session.execute(
            select(Image).where(Image.product_id == product_id).limit(limit)
        )
    return result.scalars().all()
