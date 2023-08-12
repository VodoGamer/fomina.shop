from fastapi import APIRouter

from api.services.db.images import get_images_for_product

router = APIRouter(tags=["images"])


@router.get("/images/{product_id}")
async def get_images_by_product_id(product_id: int, limit: int | None = None):
    return await get_images_for_product(product_id, limit)
