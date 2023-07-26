from typing import Optional

from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

from api.env import ADMIN_LOGIN, ADMIN_PASSWORD, ADMIN_TOKEN


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        if username != ADMIN_LOGIN or password != ADMIN_PASSWORD:
            return False
        request.session.update({"token": ADMIN_TOKEN})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> Optional[RedirectResponse]:
        token = request.session.get("token")
        if not token or token != ADMIN_TOKEN:
            return RedirectResponse(request.url_for("admin:login"), status_code=302)


authentication_backend = AdminAuth(secret_key=ADMIN_TOKEN)
