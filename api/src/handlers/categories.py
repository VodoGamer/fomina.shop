from fastapi import APIRouter

from src.database import DatabaseRepository
from src.database.models import Category

router = APIRouter(tags=["categories"])


@router.get("/categories")
async def get_categories():
    return await DatabaseRepository().category.get_all()


@router.get("/category/")
async def get_category(id_or_slug: str):
    if id_or_slug.isdigit():
        return await DatabaseRepository().category.get_by_id(int(id_or_slug))
    if id_or_slug == "all-products":
        return Category(id=-1, title="Все товары", slug="all-products")
    return await DatabaseRepository().category.get_by_slug(id_or_slug)
