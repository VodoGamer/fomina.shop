from fastapi import APIRouter

from src.database.repository import DatabaseRepository

router = APIRouter(tags=["variations"])


@router.get("/variation/{id}")
async def get_variation_by_id(id: int):
    return await DatabaseRepository().product_variation.get_by_id(id)


@router.get("/product/{product_id}/variations/")
async def get_variations_by_product_id(product_id: int):
    return await DatabaseRepository().product_variation.get_by_product(product_id)
