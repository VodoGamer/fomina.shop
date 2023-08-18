from api.client import telegram_api
from api.env import TELEGRAM_NOTIFICATION_USER_IDS


async def send_notification_to_users(message_text: str):
    for user_id in TELEGRAM_NOTIFICATION_USER_IDS:
        await telegram_api.send_message(chat_id=user_id, text=message_text)
