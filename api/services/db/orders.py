from api.client import db
from api.services.db.models import Order


async def create_order(full_name: str, address: str, phone: int, email: str):
    order = Order(**locals())
    async with db() as session:
        session.add(order)
        await session.commit()
        await session.refresh(order)
    return order.id
