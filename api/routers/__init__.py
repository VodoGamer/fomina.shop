from typing import Iterable

from fastapi.routing import APIRouter

from api.routers import category

routers: Iterable[APIRouter] = (category.router,)
