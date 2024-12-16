from abc import ABC, abstractmethod
from typing import Callable, Generic, TypeVar

from sqlalchemy.ext.asyncio import AsyncSession

from src.database.models import Base

T = TypeVar("T", bound=Base)


def _get_locals(locals: dict):
    locals.pop("self", None)
    locals.pop("session", None)
    return locals


class ABCRepository(Generic[T], ABC):
    """Abstract base class for all repositories."""

    def __init__(self, session: Callable[[], AsyncSession]):
        self.session = session

    @abstractmethod
    async def get_all(self) -> list[T]:
        """Get all entities from the database."""
        ...

    @abstractmethod
    async def get_by_id(self, id: int) -> T | None:
        """Get an entity from the database by its id."""
        ...
