from typing import Iterable

from fastapi import APIRouter

from . import categories, files, products

routers: Iterable[APIRouter] = (products.router, categories.router, files.router)
