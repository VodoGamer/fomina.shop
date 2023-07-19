from fastapi import APIRouter

from api.client import db
from api.services import get_category_products, get_product, get_product_images

router = APIRouter()


@router.get("/products/{category_slug}/")
async def get_products_by_category_slug(category_slug: str):
    return await get_category_products(db, category_slug)


@router.get("/product/{product_id}/")
async def get_product_by_id(product_id: int):
    return await get_product(db, product_id)


@router.get("/images/{product_id}")
async def get_images_by_product_id(product_id: int, limit: int | None = None):
    return await get_product_images(db, product_id, limit)
