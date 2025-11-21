from uuid import uuid4
from datetime import datetime

from fastapi import FastAPI

from app.models.order import OrderIn, OrderMessage
from app.messaging.messaging import publish_order


def create_order(app: FastAPI, order_in: OrderIn) -> OrderMessage:
    order_msg = OrderMessage(
        id=str(uuid4()),
        customerName=order_in.customerName,
        table=order_in.table,
        items=order_in.items,
        createdAt=datetime.utcnow(),
    )

    publish_order(app, order_msg)
    return order_msg
