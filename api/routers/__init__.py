from typing import Iterable

from fastapi.routing import APIRouter

from api.routers import categories

routers: Iterable[APIRouter] = (categories.router,)
