from fastapi import APIRouter

from api.services.db.products import get_product, get_products_for_category

router = APIRouter(tags=["products"])


@router.get("/products/{category_slug}/")
async def get_products_by_category_slug(category_slug: str):
    return await get_products_for_category(category_slug)


@router.get("/product/{product_id}/")
async def get_product_by_id(product_id: int):
    return await get_product(product_id)
