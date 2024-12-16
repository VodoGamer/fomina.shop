from sqlalchemy import select

from src.database.models import Product, ProductVariation, products_variations

from .abc import ABCRepository


class ProductVariationRepository(ABCRepository):
    async def get_all(self) -> list[ProductVariation]:
        async with self.session() as session:
            result = await session.execute(select(ProductVariation))
            return list(result.scalars().all())

    async def get_by_id(self, id: int) -> ProductVariation | None:
        async with self.session() as session:
            result = await session.execute(
                select(ProductVariation).where(ProductVariation.id == id)
            )
            return result.scalars().first()

    async def get_by_product(self, product_id: int) -> list[ProductVariation]:
        async with self.session() as session:
            result = await session.execute(
                select(ProductVariation)
                .join(
                    products_variations, ProductVariation.id == products_variations.c.variation_id
                )
                .join(Product, products_variations.c.product_id == Product.id)
                .where(Product.id == product_id)
                .order_by(ProductVariation.price_markup)
            )
            return list(result.scalars().all())
