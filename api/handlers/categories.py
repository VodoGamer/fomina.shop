from fastapi import APIRouter

from api.database import DatabaseRepository

router = APIRouter(tags=["categories"])


@router.get("/categories")
async def get_categories():
    return await DatabaseRepository().category.get_all()


@router.get("/category/{id}")
async def get_category(id: int):
    return await DatabaseRepository().category.get_by_id(id)
