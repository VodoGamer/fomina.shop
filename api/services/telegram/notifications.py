from api.client import logger, telegram_api
from api.env import TELEGRAM_NOTIFICATION_SELLER_IDS


async def send_notification_to_sellers(message_text: str):
    logger.debug(f"try to send notification to {TELEGRAM_NOTIFICATION_SELLER_IDS=}")
    for seller_id in TELEGRAM_NOTIFICATION_SELLER_IDS:
        await telegram_api.send_message(chat_id=int(seller_id), text=message_text)
