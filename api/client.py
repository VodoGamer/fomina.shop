from fastapi import FastAPI
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from api.env import ASYNC_DB_URI

app = FastAPI()
engine = create_async_engine(ASYNC_DB_URI)
db = async_sessionmaker(engine)
