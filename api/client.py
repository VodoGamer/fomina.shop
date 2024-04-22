from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from api.env import DB_CONNECT_URL

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_engine = create_async_engine(DB_CONNECT_URL)
session = async_sessionmaker(db_engine, expire_on_commit=False)
