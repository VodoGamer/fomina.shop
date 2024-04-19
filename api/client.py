from fastapi import FastAPI

from api.handlers import routers

app = FastAPI()

for router in routers:
    app.include_router(router)
