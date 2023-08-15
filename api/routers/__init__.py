from typing import Iterable

from fastapi.routing import APIRouter

from api.routers import categories, images, payments, products, variations

routers: Iterable[APIRouter] = (
    categories.router,
    products.router,
    images.router,
    variations.router,
    payments.router,
)
