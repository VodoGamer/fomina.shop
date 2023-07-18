from api.client import app
from api.routers import routers

for router in routers:
    app.include_router(router)
