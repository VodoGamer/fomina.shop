from uuid import UUID

from telegrinder import API, Token

from src.database.models import PaymentStatus
from src.database.repository import DatabaseRepository
from src.env import TELEGRAM_ADMIN_IDS, TELEGRAM_TOKEN

api = API(Token(TELEGRAM_TOKEN))


async def send_notification_to_admins(message: str) -> None:
    for admin_id in TELEGRAM_ADMIN_IDS:
        print((await api.send_message(admin_id, message)).unwrap())


async def get_notification_text(payment_id: UUID) -> str:
    payment = await DatabaseRepository().payment.get_by_id(payment_id)
    if not payment:
        await send_notification_to_admins("Оплата не найдена")
        raise ValueError
    order = await DatabaseRepository().order.get_by_id(payment.order_id)
    if not order:
        raise ValueError
    products = await DatabaseRepository().order_association.get_products_by_order(payment.order_id)
    variations = await DatabaseRepository().order_association.get_variations_by_order(
        payment.order_id
    )
    products_str = "\n".join(
        [
            f"— {product.title} {product.price + variations[index].price_markup}₽ "
            f"[{variations[index].key.value} - {variations[index].value}]"
            for index, product in enumerate(products)
        ]
    )
    payment_status_to_str = {
        PaymentStatus.succeeded: "оплачено✅",
        PaymentStatus.canceled: "отменено❌",
        PaymentStatus.waiting_for_capture: "ожидает оплаты🕐",
        PaymentStatus.pending: "ожидает оплаты🕐",
    }
    return (
        f"Поступил новый заказ №{payment.order_id}!\n\nСтатус платежа: "
        f"{payment_status_to_str[payment.status]}\nСумма: {payment.price}"
        f"₽\n\nСостав заказа:\n{products_str}\n\nИнформация о заказчике:\n"
        f"Имя - {order.name}\nАдрес - {order.address}\n"
        f"Телефон - {order.phone_number}\nПочта - {order.email}"
    )
