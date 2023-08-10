from typing import Iterable

from fastapi.routing import APIRouter

from api.routers import categories, payments, products

routers: Iterable[APIRouter] = (categories.router, products.router, payments.router)
