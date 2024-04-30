from src.client import session
from src.database.repositories.category import CategoryRepository
from src.database.repositories.image import ProductImageRepository
from src.database.repositories.product import ProductRepository


class DatabaseRepository:
    product = ProductRepository(session)
    category = CategoryRepository(session)
    product_image = ProductImageRepository(session)
