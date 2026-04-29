from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
from jose import jwt

from app.api.routes import router
from app.api.job_routes import router as job_router
from app.api.monitoring_routes import router as monitoring_router
from app.db.session import SessionLocal
from app.core.init_db import create_initial_admin
from app.core.logger import logger
from app.core.config import settings

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.limiter import limiter

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
app.include_router(monitoring_router)

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
            payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
            actor = payload.get("employee_id", "anonymous")
        except:
            pass

    response = await call_next(request)
    process_time = time.time() - start_time
    
    if path != "/admin/logs" and not path.startswith("/admin/monitoring") and request.method != "OPTIONS":
        message = f"{request.method} {path} - {response.status_code} - {process_time:.4f}s"
        level = "ERROR" if response.status_code >= 400 else "INFO"
        
        import asyncio
        from app.db.session import SessionLocal
        from app.modules.audit_model import AuditLog
        
        def save_log():
            db = SessionLocal()
            try:
                db.add(AuditLog(
                    level=level, service=path, source=source, actor=actor,
                    message=message, process_time=process_time, status_code=response.status_code
                ))
                db.commit()
            except Exception as e:
                print(f"Log Error: {e}")
            finally:
                db.close()
                
        asyncio.create_task(asyncio.to_thread(save_log))
        
    return response

@app.on_event("startup")
def startup():
    db = SessionLocal()
    create_initial_admin(db)
    db.close()
    
    from app.services.log_retention import purge_old_audit_logs
    purge_old_audit_logs()
