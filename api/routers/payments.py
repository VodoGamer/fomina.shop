from fastapi import APIRouter

from api.services.yookassa.payments import make_payment

router = APIRouter()


@router.post("/create_payment")
async def new_payment(value: int, return_url: str, description: str) -> str | None:
    return await make_payment(value, return_url, description)
