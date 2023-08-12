from api.client import admin, app
from api.routers import routers
from api.services.db.models import admin_models

for router in routers:
    app.include_router(router)

for admin_model in admin_models:
    admin.add_model_view(admin_model)
