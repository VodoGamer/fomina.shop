from src.client import session
from src.database.repositories.category import CategoryRepository
from src.database.repositories.image import ProductImageRepository
from src.database.repositories.order import OrderRepository
from src.database.repositories.order_association import OrderAssociationRepository
from src.database.repositories.payment import PaymentRepository
from src.database.repositories.product import ProductRepository
from src.database.repositories.product_variation import ProductVariationRepository


class DatabaseRepository:
    product = ProductRepository(session)
    category = CategoryRepository(session)
    product_image = ProductImageRepository(session)
    product_variation = ProductVariationRepository(session)
    order = OrderRepository(session)
    payment = PaymentRepository(session)
    order_association = OrderAssociationRepository(session)
