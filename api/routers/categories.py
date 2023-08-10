from fastapi import APIRouter

from api.client import db
from api.services.db import get_categories, get_category

router = APIRouter()


@router.get("/categories/")
async def get_all_categories():
    return await get_categories(db)


@router.get("/category/{category_slug}")
async def get_category_by_slug(category_slug: str):
    return await get_category(db, category_slug)
