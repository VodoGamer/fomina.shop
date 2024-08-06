from fastapi import APIRouter, Query
from fastapi.responses import HTMLResponse

from src.database import DatabaseRepository

router = APIRouter(tags=["products"])


@router.get("/products")
async def get_products(ids: list[int] = Query(alias="ids[]", default=[])):
    if ids == []:
        return await DatabaseRepository().product.get_all()
    return [await DatabaseRepository().product.get_by_id(id) for id in ids]


@router.get("/product/{id}")
async def get_product(id: int):
    response = await DatabaseRepository().product.get_by_id(id)
    return response or HTMLResponse(status_code=404)


@router.get("/products/category/{id}")
async def get_products_by_category(id: int):
    if id == -1:
        return await DatabaseRepository().product.get_all()
    return await DatabaseRepository().product.get_by_category(id)
