from fastapi import APIRouter

from api.database import DatabaseRepository

router = APIRouter(tags=["categories"])


@router.get("/categories")
async def get_categories():
    return await DatabaseRepository().category.get_all()
