from fastapi import FastAPI
from app.api.routes import router
from app.db.session import SessionLocal
from app.core.init_db import create_initial_admin

app = FastAPI()

app.include_router(router)


@app.on_event("startup")
def startup():
    db = SessionLocal()
    create_initial_admin(db)
    db.close()