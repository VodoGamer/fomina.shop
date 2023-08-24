from aiogram import Bot
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from api.admin import authentication_backend
from api.env import ASYNC_DB_URI, TELEGRAM_BOT_TOKEN
from api.storage import CustomSystemStorage

app = FastAPI()
storage = CustomSystemStorage(path="public/")

engine = create_async_engine(ASYNC_DB_URI)
db = async_sessionmaker(engine)
admin = Admin(app, engine, authentication_backend=authentication_backend)

telegram_api = Bot(TELEGRAM_BOT_TOKEN)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
