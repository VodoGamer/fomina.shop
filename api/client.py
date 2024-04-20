from fastapi import FastAPI
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from api.env import DB_CONNECT_URL

app = FastAPI()
db_engine = create_async_engine(DB_CONNECT_URL)
session = async_sessionmaker(db_engine, expire_on_commit=False)
