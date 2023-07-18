from fastapi import APIRouter

from api.client import db
from api.services import get_categories

router = APIRouter()


@router.get("/categories/")
async def get_all_categories():
    return await get_categories(db)
