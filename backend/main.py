from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
from jose import jwt

from app.api.routes import router
from app.api.job_routes import router as job_router
from app.db.session import SessionLocal
from app.core.init_db import create_initial_admin
from app.core.logger import logger
from app.core.config import settings

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
    
    path = request.url.path
    if path.startswith("/admin") or path.startswith("/auth") or path.startswith("/users"):
        source = "internal"
    else:
        source = "site"

    actor = "anonymous"
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm], options={"verify_exp": False})
            actor = payload.get("employee_id", "anonymous")
        except:
            pass

    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Do not log the logs endpoint itself to prevent infinite polling loops
    if path != "/admin/logs":
        logger.info(
            f"{request.method} {path} - {response.status_code} - {process_time:.4f}s",
            extra={"source": source, "actor": actor}
        )
    
    return response

@app.on_event("startup")
def startup():
    db = SessionLocal()
    create_initial_admin(db)
    db.close()