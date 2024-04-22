from fastapi import APIRouter

from api.database import DatabaseRepository

router = APIRouter(tags=["categories"])


@router.get("/categories")
async def get_categories():
    return await DatabaseRepository().category.get_all()


@router.get("/category/")
async def get_category(id_or_slug: str):
    if id_or_slug.isdigit():
        return await DatabaseRepository().category.get_by_id(int(id_or_slug))
    return await DatabaseRepository().category.get_by_slug(id_or_slug)
