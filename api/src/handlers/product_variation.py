from fastapi import APIRouter, Query

from src.database.repository import DatabaseRepository

router = APIRouter(tags=["variations"])


@router.get("/variations")
async def get_variations(ids: list[int] = Query(alias="ids[]", default=[])):
    if ids == []:
        return await DatabaseRepository().product_variation.get_all()
    return [await DatabaseRepository().product_variation.get_by_id(id) for id in ids]


@router.get("/variation/{id}")
async def get_variation_by_id(id: int):
    return await DatabaseRepository().product_variation.get_by_id(id)


@router.get("/product/{product_id}/variations/")
async def get_variations_by_product_id(product_id: int):
    return await DatabaseRepository().product_variation.get_by_product(product_id)
