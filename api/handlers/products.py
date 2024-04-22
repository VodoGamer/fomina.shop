from fastapi import APIRouter

from api.database import DatabaseRepository

router = APIRouter(tags=["products"])


@router.get("/products")
async def get_products():
    return await DatabaseRepository().product.get_all()


@router.get("/product/{id}")
async def get_product(id: int):
    return await DatabaseRepository().product.get_by_id(id)
