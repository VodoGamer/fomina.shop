from fastapi import APIRouter

from api.services.db.categories import get_categories, get_category

router = APIRouter(tags=["categories"])


@router.get("/categories/")
async def get_all_categories():
    return await get_categories()


@router.get("/category/{category_slug}")
async def get_category_by_slug(category_slug: str):
    return await get_category(category_slug)
