from api.client import telegram_api
from api.env import TELEGRAM_NOTIFICATION_SELLER_IDS


async def send_notification_to_sellers(message_text: str):
    for user_id in TELEGRAM_NOTIFICATION_SELLER_IDS:
        await telegram_api.send_message(chat_id=user_id, text=message_text)
