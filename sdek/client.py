from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from sdek.calculator import Size, calculate_delivery
from sdek.delivery_points import DeliveryPoint, get_handout_points
from sdek.models import CalculatorResponse, DeliveryTariff, ErrorsResponse

sdek_app = FastAPI(title="SDEK API")


@sdek_app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    try:
        data = ErrorsResponse(**exc.errors()[0]["input"]).model_dump()
    except ValidationError:
        data = exc.json()
    return JSONResponse(status_code=422, content=data)


@sdek_app.get("/calculate")
async def calculate(is_courier: bool, to_address: str, count: int = 1) -> CalculatorResponse:
    return await calculate_delivery(
        DeliveryTariff.Courier if is_courier else DeliveryTariff.Warehouse,
        to_address,
        Size(20, 20, 5),
        count * 300,
    )


@sdek_app.get("/handout_points")
async def handout_points(city_name: str) -> list[DeliveryPoint]:
    return await get_handout_points(city_name)
