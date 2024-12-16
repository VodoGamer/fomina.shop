from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse

from src.env import ADMIN_PASSWORD, ADMIN_TOKEN, ADMIN_USERNAME


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        if username != ADMIN_USERNAME or password != ADMIN_PASSWORD:
            return False
        request.session.update({"token": ADMIN_TOKEN})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> RedirectResponse | bool:
        token = request.session.get("token")
        if not token or token != ADMIN_TOKEN:
            return RedirectResponse(request.url_for("admin:login"), status_code=302)
        return True


authentication_backend = AdminAuth(secret_key=ADMIN_TOKEN)
