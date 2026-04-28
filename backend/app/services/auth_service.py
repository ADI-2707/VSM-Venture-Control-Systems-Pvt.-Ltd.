from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi import HTTPException, status

from app.services.user_services import get_user_by_email
from app.core.hash import verify_password
from app.core.security import create_access_token, create_refresh_token
from app.modules.user_model import User
from app.core.config import settings


def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    access_token = create_access_token({
        "sub": str(user.id),
        "role": user.role,
        "token_version": user.token_version,
        "employee_id": user.employee_id,
    })

    refresh_token = create_refresh_token({
        "sub": str(user.id),
        "token_version": user.token_version,
    })

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": user
    }


def refresh_access_token(db: Session, token: str):
    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm]
        )

        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token",
            )

        user_id = int(payload["sub"])
        token_version = payload.get("token_version")

    except (JWTError, KeyError, TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    user: User = db.query(User).filter(User.id == user_id).first()

    if not user or user.token_version != token_version:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalidated",
        )

    new_access = create_access_token({
        "sub": str(user.id),
        "role": user.role,
        "token_version": user.token_version,
        "employee_id": user.employee_id,
    })

    return new_access
