from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time

from app.api.routes import router
from app.api.job_routes import router as job_router
from app.db.session import SessionLocal
from app.core.init_db import create_initial_admin
from app.core.logger import logger

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(job_router)   

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Log the request
    logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
    
    return response

@app.on_event("startup")
def startup():
    db = SessionLocal()
    create_initial_admin(db)
    db.close()