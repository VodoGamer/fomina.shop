from typing import Iterable

from fastapi.routing import APIRouter

from api.routers import (
    categories,
    delivery,
    images,
    orders,
    payments,
    payments_daemon,
    products,
    variations,
)

routers: Iterable[APIRouter] = (
    categories.router,
    products.router,
    images.router,
    variations.router,
    orders.router,
    payments.router,
    payments_daemon.router,
    delivery.router,
)
