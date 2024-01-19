from typing import Annotated

from fastapi import APIRouter, Query

from api.services.db.products import (
    count_products_price,
    get_product,
    get_products,
    get_products_for_category,
)

router = APIRouter(tags=["products"])


@router.get("/products/{category_slug}/")
async def get_products_by_category_slug(category_slug: str):
    return await get_products_for_category(category_slug)


@router.get("/product/{product_id}/")
async def get_product_by_id(product_id: int):
    return await get_product(product_id)


@router.get("/products")
async def get_products_by_ids(product_ids: Annotated[list[int], Query()]):
    return await get_products(product_ids)


@router.get("/products_sum")
async def get_product_prices_by_ids(product_ids: Annotated[list[int], Query()]):
    return await count_products_price(product_ids)
