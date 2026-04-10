from fastapi import FastAPI
from app.api.routes import api_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="VSM Backend",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Register routes
    app.include_router(api_router, prefix="/api")

    return app


app = create_app()