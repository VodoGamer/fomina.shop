from fastapi import APIRouter

from api.client import db
from api.services import get_category_products

router = APIRouter()


@router.get("/products/{category_slug}/")
async def get_product_by_category_slug(category_slug: str):
    return await get_category_products(db, category_slug)
