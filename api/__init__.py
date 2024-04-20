from api.client import app
from api.handlers import routers

for router in routers:
    app.include_router(router)
