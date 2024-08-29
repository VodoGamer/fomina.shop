import orjson
from aiohttp import ClientSession

from sdek.models import DeliveryTariff, TokenResponse
from src.env import SDEK_API_URL, SDEK_CLIENT_ID, SDEK_CLIENT_SECRET


async def get_token(grant_type: str = "client_credentials") -> TokenResponse:
    async with ClientSession() as session:
        async with session.post(
            f"{SDEK_API_URL}/oauth/token",
            params={
                "grant_type": grant_type,
                "client_id": SDEK_CLIENT_ID,
                "client_secret": SDEK_CLIENT_SECRET,
            },
        ) as resp:
            result = orjson.loads(await resp.text())
        return TokenResponse(**result)


class HttpClient:
    def __init__(self, headers: dict[str, str] | None = None) -> None:
        self.headers = headers or {}

    async def _update_base_headers(self):
        if self.headers.get("Authorization"):
            return
        token = await get_token()
        base_headers = {
            "Authorization": f"Bearer {token.access_token}",
            "Content-Type": "application/json",
        }
        self.headers.update(base_headers)

    async def _post(self, url: str, data: bytes | str | None = None):
        await self._update_base_headers()
        async with ClientSession() as session:
            async with session.post(SDEK_API_URL + url, data=data, headers=self.headers) as resp:
                result = await resp.text()
            return result

    async def calculate_delivery(
        self,
        tariff: DeliveryTariff,
        from_address: str,
        to_address: str,
        width: int,
        height: int,
        length: int,
        weight: int,
    ) -> str:
        data = {
            "tariff_code": tariff.value,
            "from_location": {"address": from_address},
            "to_location": {"address": to_address},
            "packages": [{"width": width, "height": height, "length": length, "weight": weight}],
        }
        return await self._post(url="/calculator/tariff", data=orjson.dumps(data))