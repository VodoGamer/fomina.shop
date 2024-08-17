import os
from typing import Final

from dotenv import load_dotenv

load_dotenv()

DB_HOST: Final[str] = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT: Final[str] = os.getenv("POSTGRES_PORT", "5432")
DB_USER: Final[str] = os.getenv("POSTGRES_USER", "postgres")
DB_PASSWORD: Final[str] = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_TABLE: Final[str] = os.getenv("POSTGRES_TABLE", "fomina_shop")

DB_CONNECT_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_TABLE}"

YOOKASSA_ACCOUNT_ID: Final[int] = int(os.getenv("YOOKASSA_ACCOUNT_ID", 123))
YOOKASSA_SECRET_KEY: Final[str] = os.getenv("YOOKASSA_SECRET_KEY", "SUPER_SECRET_KEY")

UI_URL: Final[str] = os.getenv("UI_URL", "http://localhost:3000")

ADMIN_USERNAME: Final[str] = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD: Final[str] = os.getenv("ADMIN_PASSWORD", "admin")
ADMIN_TOKEN: Final[str] = os.getenv("ADMIN_TOKEN", "admin_token")

if ADMIN_USERNAME == "admin" or ADMIN_PASSWORD == "admin":
    raise ValueError("Change admin credentials in .env file!")
