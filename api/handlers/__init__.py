from typing import Iterable

from fastapi import APIRouter

from . import categories, products

routers: Iterable[APIRouter] = (products.router, categories.router)
