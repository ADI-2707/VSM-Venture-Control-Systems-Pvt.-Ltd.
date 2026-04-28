from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import asyncio
import os

from app.db.deps import get_db

from app.modules.user_schema import RefreshTokenRequest, UserCreate, UserLogin, UserResponse, ChangePasswordRequest
from app.modules.user_model import User

from app.services.user_services import create_user, change_user_password
from app.services.auth_service import login_user, refresh_access_token

from app.core.deps_auth import get_current_admin, get_current_user

router = APIRouter()


@router.post("/auth/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, data.email, data.password)

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = result["user"]

    return {
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"],
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "first_name": user.first_name,
            "last_name": user.last_name,
        },
    }


@router.post("/auth/refresh")
def refresh_token(
    data: RefreshTokenRequest,
    db: Session = Depends(get_db),
):
    new_access = refresh_access_token(db, data.token)
    return {"access_token": new_access}


@router.post("/auth/change-password")
def change_password_route(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    success = change_user_password(db, current_user, data.current_password, data.new_password)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid current password")
    return {"message": "Password updated successfully"}


@router.post("/users", response_model=UserResponse)
def create_user_route(
    data: UserCreate,
    db: Session = Depends(get_db),
    _: None = Depends(get_current_admin),
):
    return create_user(db, data)


@router.get("/auth/profile", response_model=UserResponse)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.post("/auth/logout")
def logout_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    current_user.token_version += 1
    db.commit()

    return {"message": "Logged out successfully"}


@router.get("/admin/logs")
def get_system_logs(
    limit: int = 200,
    _: User = Depends(get_current_admin)
):
    import json
    log_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "logs", "app.log")
    logs = []
    
    if os.path.exists(log_file_path):
        with open(log_file_path, "r") as f:
            lines = f.readlines()
            last_lines = lines[-limit:] if len(lines) > limit else lines
            for line in last_lines:
                if line.strip():
                    try:
                        logs.append(json.loads(line.strip()))
                    except:
                        logs.append({
                            "time": "",
                            "level": "INFO",
                            "service": "system",
                            "source": "system",
                            "actor": "anonymous",
                            "message": line.strip()
                        })
    return logs
