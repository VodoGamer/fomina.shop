import logging
import sys

from aiogram import Bot
from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )
