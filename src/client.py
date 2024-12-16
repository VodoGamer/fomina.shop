from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi_storages import FileSystemStorage
from pydantic import ValidationError
from sqladmin import Admin
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from src.env import DB_CONNECT_URL
from src.services.admin.auth import authentication_backend

app = FastAPI(prefix="/v2")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
storage = FileSystemStorage("uploads/")


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(status_code=422, content=exc.json())


db_engine = create_async_engine(DB_CONNECT_URL)
session = async_sessionmaker(db_engine, expire_on_commit=False)

admin = Admin(app, engine=db_engine, authentication_backend=authentication_backend)
