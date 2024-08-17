from ipaddress import ip_address, ip_network
from uuid import UUID

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from src.database.models import PaymentStatus
from src.database.repository import DatabaseRepository

router = APIRouter(tags=["notifications"])

# YOOKASSA trusted IPs for notifications
ALLOWED_RANGES = [
    "185.71.76.0/27",
    "185.71.77.0/27",
    "77.75.153.0/25",
    "77.75.156.11/32",
    "77.75.156.35/32",
    "77.75.154.128/25",
]


class NotificationObject(BaseModel):
    id: UUID
    status: PaymentStatus
    amount: dict


class Notification(BaseModel):
    type: str
    event: str
    object: NotificationObject


@router.post("/notification")
async def notification(item: Notification, request: Request):
    if not request.client:
        return HTMLResponse(status_code=500)
    client_ip = ip_address(request.client.host)
    for range in ALLOWED_RANGES:
        range_network = ip_network(range)
        if client_ip in range_network:
            await DatabaseRepository().payment.change_status(item.object.id, item.object.status)
            return HTMLResponse(status_code=200)
    return HTMLResponse(status_code=401)
