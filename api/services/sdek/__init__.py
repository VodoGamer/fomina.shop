from typing import Any, Literal

import aiohttp
import ujson
from pydantic import BaseModel

from api.env import SDEK_BASE_API_URL, SDEK_CLIENT_ID, SDEK_CLIENT_SECRET


class AuthResponse(BaseModel):
    access_token: str
    token_type: Literal["bearer"]
    expires_in: int
    scope: str
    jti: str


class ResponseError(BaseModel):
    code: str
    message: str


async def get_token() -> AuthResponse:
    async with aiohttp.ClientSession() as session:
        async with session.post(
            f"{SDEK_BASE_API_URL}/oauth/token",
            data={
                "client_id": SDEK_CLIENT_ID,
                "client_secret": SDEK_CLIENT_SECRET,
                "grant_type": "client_credentials",
            },
        ) as resp:
            return AuthResponse(**ujson.loads(await resp.read()))


async def make_get_request(method: str, params: Any | None = None) -> Any:
    return await _get_request_session("get", method, params)


async def make_post_request(method: str, data: Any | None = None) -> Any:
    return await _get_request_session("post", method, data)


async def _get_request_session(
    http_method: Literal["get", "post"], api_method: str, data: Any | None = None
) -> Any:
    auth: AuthResponse = await get_token()
    async with aiohttp.ClientSession(
        headers={"Authorization": f"{auth.token_type} {auth.access_token}"}
    ) as session:
        api_url: str = f"{SDEK_BASE_API_URL}/{api_method}"
        if http_method == "get":
            async with session.get(api_url, params=data) as resp:
                return await resp.json(loads=ujson.loads)
        else:
            async with session.post(api_url, json=data) as resp:
                return await resp.json(loads=ujson.loads)
