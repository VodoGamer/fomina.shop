from typing import Any
from uuid import uuid4

import aiohttp

from api.env import YOOKASSA_SECRET_KEY, YOOKASSA_SHOPID


async def make_get_request(method: str, data: Any | None = None) -> bytes:
    return await _get_request_session("get", method, data)


async def make_post_request(method: str, data: Any | None = None) -> bytes:
    return await _get_request_session("post", method, data)


async def _get_request_session(
    http_method: str, api_method: str, data: Any | None = None
) -> bytes:
    async with aiohttp.ClientSession(
        headers={
            "Idempotence-Key": str(uuid4()),
            "Content-Type": "application/json",
        },
        auth=aiohttp.BasicAuth(YOOKASSA_SHOPID, YOOKASSA_SECRET_KEY),
    ) as session:
        api_url = f"https://api.yookassa.ru/v3/{api_method}"
        if http_method == "get":
            async with session.get(api_url, data=data) as resp:
                return await resp.read()
        else:
            async with session.post(api_url, data=data) as resp:
                return await resp.read()
