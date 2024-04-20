from fastapi import APIRouter

from api.database import DatabaseRepository

router = APIRouter(tags=["products"])


@router.get("/products")
async def get_products():
    return await DatabaseRepository().product.get_all()
