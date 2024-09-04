from uuid import UUID

from pydantic import BaseModel, TypeAdapter

from sdek.http_client import HttpClient


class City(BaseModel):
    code: int


class DeliveryPointLocation(BaseModel):
    latitude: float
    longitude: float
    address: str


class DeliveryPoint(BaseModel):
    code: str
    uuid: UUID
    location: DeliveryPointLocation


points_type_adapter = TypeAdapter(list[DeliveryPoint])


async def get_handout_points(city_name: str) -> list[DeliveryPoint]:
    city_info = await HttpClient().get_city_info(city_name=city_name)
    city = City(**city_info[0])
    handout_points_data = await HttpClient().get_delivery_points(city.code, is_handout=True)
    handout_points = points_type_adapter.validate_python(handout_points_data)
    return handout_points
