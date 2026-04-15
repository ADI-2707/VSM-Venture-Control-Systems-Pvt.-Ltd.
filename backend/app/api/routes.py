from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.modules.user_schema import UserCreate, UserLogin
from app.services.user_services import create_user
from app.services.auth_service import login_user

router = APIRouter()


@router.post("/auth/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    result = login_user(db, data.email, data.password)

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return result


@router.post("/users")
def create_user_route(data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, data)