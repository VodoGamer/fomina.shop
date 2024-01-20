import logging
import sys

from aiogram import Bot
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError, ResponseValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from sqladmin import Admin
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from api.admin import authentication_backend
from api.env import ASYNC_DB_URI, TELEGRAM_BOT_TOKEN
from api.storage import CustomSystemStorage

logger: logging.Logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler(sys.stdout))

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


@app.exception_handler(RequestValidationError)
@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)
