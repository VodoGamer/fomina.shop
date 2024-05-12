from fastapi import APIRouter

from src.database.repository import DatabaseRepository

router = APIRouter()


@router.get("/product/{id}/variations")
async def get_product_variations(id: int):
    return await DatabaseRepository().product_variation.get_by_product_id(id)
