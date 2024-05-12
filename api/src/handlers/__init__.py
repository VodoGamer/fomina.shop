from typing import Iterable

from fastapi import APIRouter

from . import categories, files, product_variation, products

routers: Iterable[APIRouter] = (
    products.router,
    categories.router,
    files.router,
    product_variation.router,
)
