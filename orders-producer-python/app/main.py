from fastapi import FastAPI

from app.config import settings
from app.controllers.order_controller import router as order_router
from app.messaging.messaging import init_rabbit, close_rabbit

app = FastAPI(title=settings.PROJECT_NAME)

@app.on_event("startup")
def startup_event():
    init_rabbit(app)

@app.on_event("shutdown")
def shutdown_event():
    close_rabbit(app)

app.include_router(order_router)
