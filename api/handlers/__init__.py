from typing import Iterable

from fastapi import APIRouter

from . import products

routers: Iterable[APIRouter] = (products.router,)
