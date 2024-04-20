import os
from typing import Final

from dotenv import load_dotenv

load_dotenv()

DB_HOST: Final[str] = os.getenv("DB_HOST", "localhost")
DB_PORT: Final[str] = os.getenv("DB_PORT", "5432")
DB_USER: Final[str] = os.getenv("DB_USER", "postgres")
DB_PASSWORD: Final[str] = os.getenv("DB_PASSWORD", "postgres")
DB_TABLE: Final[str] = os.getenv("DB_TABLE", "fomina_shop")

DB_CONNECT_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_TABLE}"
