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

ADMIN_USERNAME: Final[str] = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD: Final[str] = os.getenv("ADMIN_PASSWORD", "admin")
ADMIN_TOKEN: Final[str] = os.getenv("ADMIN_TOKEN", "admin_token")

if ADMIN_USERNAME == "admin" or ADMIN_PASSWORD == "admin":
    raise ValueError("Change admin credentials in .env file!")
