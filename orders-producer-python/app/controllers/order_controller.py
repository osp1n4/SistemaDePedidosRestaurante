from fastapi import APIRouter, Request

from app.models.order import OrderIn, OrderMessage
from app.services.order_service import create_order

router = APIRouter(
    prefix="/api/v1/orders",
    tags=["orders"],
)

@router.post("/", response_model=OrderMessage, status_code=201)
def create_order_endpoint(order_in: OrderIn): 
    return create_order(order_in)