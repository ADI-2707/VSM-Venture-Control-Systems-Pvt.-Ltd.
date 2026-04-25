from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.modules.user_schema import UserCreate, UserLogin, UserResponse
from app.services.user_services import create_user
from app.services.auth_service import login_user
from app.core.deps_auth import get_current_admin

router = APIRouter()


@router.post("/auth/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, data.email, data.password)

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = result["user"]

    return {
        "access_token": result["access_token"],
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "first_name": user.first_name,
            "last_name": user.last_name,
        },
    }


@router.post("/users", response_model=UserResponse)
def create_user_route(
    data: UserCreate,
    db: Session = Depends(get_db),
    _: None = Depends(get_current_admin),
):
    return create_user(db, data)