from api.client import admin, app
from api.handlers import routers
from api.services.admin.views import admin_views

for router in routers:
    app.include_router(router)

for admin_view in admin_views:
    admin.add_view(admin_view)
