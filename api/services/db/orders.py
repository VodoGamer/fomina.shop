from sqlalchemy import select

from api.client import db
from api.services.db.models import Order, Payment, product_order_table


async def create_order(full_name: str, address: str, phone: int, email: str):
    order = Order(**locals())
    async with db() as session:
        session.add(order)
        await session.commit()
        await session.refresh(order)
    return order.id


async def add_products_to_order(order_id: int, product_ids: list[int]):
    async with db() as session:
        for product_id in product_ids:
            await session.execute(
                product_order_table.insert().values(
                    order_id=order_id,
                    product_id=product_id,
                )
            )
        await session.commit()
