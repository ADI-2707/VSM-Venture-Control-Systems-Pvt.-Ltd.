from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db

from app.modules.user_schema import UserCreate, UserLogin, UserResponse
from app.modules.user_model import User

from app.services.user_services import create_user
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
    token: str,
    db: Session = Depends(get_db),
):
    new_access = refresh_access_token(db, token)
    return {"access_token": new_access}


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