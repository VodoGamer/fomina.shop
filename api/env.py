import os

from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "qwerty")
DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT = int(os.getenv("POSTGRES_PORT", 5432))
DB_TABLE = os.getenv("POSTGRES_TABLE", "fomina_pw")

ADMIN_LOGIN = os.getenv("ADMIN_LOGIN", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "password!")
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "...")

YOOKASSA_SHOPID = os.getenv("YOOKASSA_SHOPID", "123456")
YOOKASSA_SECRET_KEY = os.getenv("YOOKASSA_SECRET_KEY", "very_secret")

SDEK_CLIENT_ID = os.getenv("SDEK_CLIENT_ID", "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI")
SDEK_CLIENT_SECRET = os.getenv("SDEK_CLIENT_SECRET", "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG")
SDEK_BASE_API_URL = os.getenv("SDEK_BASE_API_URL", "https://api.edu.cdek.ru/v2")

BASE_UI_URL = os.getenv("BASE_UI_URL", "http://ui:4173")

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "123456:token")
TELEGRAM_NOTIFICATION_SELLER_IDS: list[str] = os.getenv(
    "TELEGRAM_NOTIFICATION_USER_IDS", "1, 2"
).split(",")

BASE_DB_URI = f"{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_TABLE}"
PSYCOPG_DB_URI = f"postgresql://{BASE_DB_URI}"
ASYNC_DB_URI = f"postgresql+asyncpg://{BASE_DB_URI}"
