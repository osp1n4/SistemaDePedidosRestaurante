import json
import pika
from fastapi import FastAPI

from app.config import settings
from app.models.order import OrderMessage

def init_rabbit(app: FastAPI) -> None:
    params = pika.URLParameters(settings.CLOUDAMQP_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue=settings.ORDERS_QUEUE, durable=True)

    app.state.rabbit_connection = connection
    app.state.rabbit_channel = channel

def close_rabbit(app: FastAPI) -> None:
    connection = getattr(app.state, "rabbit_connection", None)
    if connection is not None and connection.is_open:
        connection.close()

def publish_order(app: FastAPI, order: OrderMessage) -> None:
    channel = app.state.rabbit_channel

    # Pydantic v2: convierte el modelo a JSON listo para mandar
    body = order.model_dump_json().encode("utf-8")

    channel.basic_publish(
        exchange="",
        routing_key=settings.ORDERS_QUEUE,
        body=body,
        properties=pika.BasicProperties(delivery_mode=2),
    )
