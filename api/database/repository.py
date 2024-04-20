from api.client import session
from api.database.repositories.category import CategoryRepository
from api.database.repositories.product import ProductRepository


class DatabaseRepository:
    product = ProductRepository(session)
    category = CategoryRepository(session)
