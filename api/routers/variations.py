from fastapi import APIRouter

from api.services.db.variations import get_variation_for_product

router = APIRouter(tags=["variations"])


@router.get("/variations/{product_id}")
async def variations_for_product(product_id: int):
    return await get_variation_for_product(product_id)
