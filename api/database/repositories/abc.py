from abc import ABC, abstractmethod
from typing import Callable, Generic, TypeVar

from sqlalchemy.ext.asyncio import AsyncSession

from api.models import Base

T = TypeVar("T", bound=Base)


class ABCRepository(Generic[T], ABC):
    """Abstract base class for all repositories."""

    def __init__(self, session: Callable[[], AsyncSession]):
        self.session = session

    @abstractmethod
    async def get_all(self) -> list[T]:
        """Get all entities from the database."""
        ...